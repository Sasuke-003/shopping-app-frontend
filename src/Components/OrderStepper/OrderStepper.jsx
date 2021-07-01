import React from "react";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import WarningIcon from "@material-ui/icons/Warning";
// import "./OrderStepper.css";

const useStyles = makeStyles((theme) => ({
    // root: {
    //     width: "100%",
    // },

    root: {
        "& .MuiStepIcon-root": {
            // color: "#17b978",
        },
        "& .MuiTypography-root": {
            color: "var(--secondary)",
        },
        "& .MuiStepper-root": {
            background: "transparent !important",
        },
    },
    root2: {
        "& .MuiStepIcon-root": {
            // color: "red",
        },
        "& .MuiTypography-root": {
            color: "var(--secondary)",
        },
        "& .MuiStepper-root": {
            background: "transparent !important",
        },
    },
}));

function getSteps(step) {
    if (step === 0) {
        return ["Order Received", "Order Dispatched", "Order Canceled"];
    }
    return ["Order Received", "Order Dispatched", "Out For Delivery", "Delivered"];
}

export default function OrderStepper({ step = 1 }) {
    const classes = useStyles();

    const steps = getSteps(step);

    return (
        <div className='orderStepper'>
            {" "}
            <div className={step === 0 ? classes.root2 : classes.root}>
                <Stepper activeStep={step === 0 ? 3 : step}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step className='active' key={label} {...stepProps}>
                                <StepLabel color='error' {...labelProps}>
                                    {label}
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
        </div>
    );
}
