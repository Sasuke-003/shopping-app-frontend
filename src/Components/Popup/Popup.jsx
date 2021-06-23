import React, { useState } from "react";
import "./Popup.css";
import { openPopup, closePopup } from "../../util";
import { connect } from "react-redux";

function Popup({ children, snackbarStatus, width = "50vw", height = "50vh" }) {
    const [isHovered, setIsHovered] = useState(false);
    const handleClose = () => {
        if (!isHovered) {
            closePopup();
        }
    };
    return (
        <div className={`popup ${snackbarStatus.popupOpen ? "" : "popup__hidden"}`} onClick={() => handleClose()}>
            <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='popup__container'>
                {children}
            </div>
        </div>
    );
}

const mapSateToProps = (state) => ({
    snackbarStatus: state.snackbar,
});

export default connect(mapSateToProps)(Popup);
