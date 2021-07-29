import './ImageUploadDialog.css'
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import api from '../../apiCalls'

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function ImageUploadDialog({ user, dailogType }) {
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = useState(null);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setFile(null);
        setOpen(false);
    };
    const handleCloseSave = () => {
        const userdata = {};

        if (file !== null) {
            const filedata = new FormData();
            const filename = Date.now() + file.name;
            filedata.append("file", file, filename);
            userdata.profilePic = filename;
            
            if(api.updateUserProfile(user._id, userdata, filedata)){
                document.getElementById("TextInfoFileUpload").className = "successInfo";
                document.getElementById("TextInfoFileUpload").innerHTML = "Updated Successfully!";
                window.location.reload()
            }
            else{
                document.getElementById("TextInfoFileUpload").className = "errorInfo";
                document.getElementById("TextInfoFileUpload").innerHTML = "Update Unsuccessful!";
            }
        }
    };

    return (
        <div>
            <button className="ChangeProfilePicBtn" variant="outlined" color="primary" onClick={handleClickOpen}>
                <EditIcon />
            </button>
            <Dialog onClose={handleClose} fullWidth aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {dailogType === 1 ? "Change Profile Picture" : "Change Cover Picture"}
                </DialogTitle>
                <DialogContent dividers>
                    <div className="ImageUploadDialogContainer">
                        <div className="ImageUploadIcon">
                            <label htmlFor="Imgfile">Upload Image File</label>
                        </div>
                        <input style={{ display: "none" }} accept=".png, .jpg, .jpeg" id="Imgfile" onChange={(e) => setFile(e.target.files[0])} type="file" className="" />
                        {file == null ? "" : <img className="ImageUploadDialogImg" src={URL.createObjectURL(file)} alt="" />}
                        <div id="TextInfoFileUpload"></div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseSave} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
