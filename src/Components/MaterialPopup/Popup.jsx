import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import "./Popup.css";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant='h5'>{children}</Typography>
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

const Popup = (props) => {
    const { open, handleClose, heading, noButton = false } = props;
    return (
        <div className='popup'>
            <Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' fullWidth='xl' maxWidth='md' open={open}>
                <DialogTitle id='customized-dialog-title' onClose={handleClose}>
                    {heading}
                </DialogTitle>
                <DialogContent dividers>{props.children}</DialogContent>
                <DialogActions>
                    {!noButton ? (
                        <Button autoFocus onClick={handleClose} color='primary'>
                            OK
                        </Button>
                    ) : null}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Popup;
