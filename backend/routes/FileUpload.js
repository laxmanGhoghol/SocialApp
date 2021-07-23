const router = require('express').Router();
const jwt = require('jsonwebtoken');
const multer = require('multer')

//authenticate jwt token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user
        next()
    });

}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        console.log(req);
        cb(null, file.originalname);
    },
});


const upload = multer({ storage });
router.post("/",  upload.single("file"), (req, res) => {
    try {
        return res.status(200).json({ 'ok': true, 'data': 'uploaded.' })
    } catch (err) {
        console.log(err);
    }
})

module.exports = router