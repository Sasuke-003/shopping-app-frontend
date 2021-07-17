import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
        bottom: "50px",
    },
    bar: {
        bottom: "5vh",
    },
}));

export default function Snackbars({ status, message, open, handleClose, autoHideDuration = 3000 }) {
    const classes = useStyles();

    let Alert;

    if (status === "success")
        Alert = (
            <MuiAlert elevation={6} variant='filled' onClose={handleClose} severity='success'>
                {message}
            </MuiAlert>
        );
    else if (status === "error")
        Alert = (
            <MuiAlert elevation={6} variant='filled' onClose={handleClose} severity='error'>
                {message}
            </MuiAlert>
        );
    else if (status === "warning")
        Alert = (
            <MuiAlert elevation={6} variant='filled' onClose={handleClose} severity='warning'>
                {message}
            </MuiAlert>
        );
    else if (status === "info")
        Alert = (
            <MuiAlert elevation={6} variant='filled' onClose={handleClose} severity='info'>
                {message}
            </MuiAlert>
        );

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose} className={classes.bar}>
                {Alert}
            </Snackbar>
        </div>
    );
}
