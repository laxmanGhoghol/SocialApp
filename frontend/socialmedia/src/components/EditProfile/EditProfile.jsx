import React, { useRef, useState } from 'react';
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
import './EditProfile.css'

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

export default function EditProfile({ user }) {
    const [open, setOpen] = React.useState(false);

    const city = useRef();
    const from = useRef();
    const desc = useRef();
    const [relationship, SetRelationshop] = useState(user.relationship);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseSave = () => {
        const updateData = {};
        if (city.current.value !== user.city && city.current.value !== "") {
            updateData.city = city.current.value;
        }
        if (from.current.value !== user.from && from.current.value !== "") {
            updateData.from = from.current.value;
        }
        if (desc.current.value !== user.desc && desc.current.value !== "") {
            updateData.desc = desc.current.value;
        }
        if (relationship !== user.relationship && relationship !== "") {
            updateData.relationship = relationship;
        }
        if (Object.keys(updateData).length >= 1) {
            if (api.updateUserProfile(user._id, updateData)) {
                document.getElementById("TextInfo").className = "successInfo";
                document.getElementById("TextInfo").innerHTML = "Updated Successfully!";
            }
            else {
                document.getElementById("TextInfo").className = "errorInfo";
                document.getElementById("TextInfo").innerHTML = "Update Unsuccessful!";
            }
            
        } else {
            document.getElementById("TextInfo").className = "errorInfo";
            document.getElementById("TextInfo").innerHTML = "No changes Made!";
        }
    };

    const handleItemChange = (e) =>{
        SetRelationshop(e.target.value)
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                <EditIcon />
            </Button>
            <Dialog onClose={handleClose} fullWidth aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edit Profile
                </DialogTitle>
                <DialogContent dividers>
                    <div className="EditProfileContainer">
                        <label>City:</label>
                        <input ref={city} className="EditProfileInput" defaultValue={user.city} type="text" placeholder="City" />
                        <label>From:</label>
                        <input ref={from} className="EditProfileInput" defaultValue={user.from} type="text" placeholder="From" />
                        <label>Description:</label>
                        <input ref={desc} className="EditProfileInput" defaultValue={user.desc} type="text" placeholder="Description" />
                        <label>Relationship:</label>
                        <select className="EditProfileInput" onChange={handleItemChange} id="simple-menu" keepMounted open={true} >
                            <option  value="Married">Married</option >
                            <option  value="Single">Single</option >
                            <option  value="In a relationship">In a relationship</option >
                            <option  value="Engaged">Engaged</option >
                        </select>
                        <div id="TextInfo"></div>
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
