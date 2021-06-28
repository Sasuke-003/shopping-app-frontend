import Snackbars from "./Components/snackbars/Snackbars";
import { store } from "./redux/store";
import { openSnackbar } from "./redux/snackbar/snackbar.actions";
import Popup from "./Components/Popup/Popup";
import { setCurrentUserStatus } from "./redux/userStatus/userStatus.actions";
import { setCurrentUserToken } from "./redux/userToken/userToken.actions";

export const HorizontalDragScrollEnable = (className) => {
    const slider = document.querySelector("." + className);
    let mouseDown = false;
    let startX, scrollLeft;

    let startDragging = function (e) {
        mouseDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    };
    let stopDragging = function (event) {
        mouseDown = false;
    };

    slider.addEventListener("mousemove", (e) => {
        e.preventDefault();
        if (!mouseDown) {
            return;
        }
        const x = e.pageX - slider.offsetLeft;
        const scroll = x - startX;
        slider.scrollLeft = scrollLeft - scroll;
    });

    // Add the event listeners
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);
};

export const throwMsg = (open, handleClose, status, msg) => <Snackbars open={open} handleClose={handleClose} status={status} message={msg} />;

export const getPopup = (status, msg) => store.dispatch(openSnackbar({ open: true, status: status, msg: msg }));
export const openMyPopup = (msg, func) => store.dispatch(openSnackbar({ popupOpen: true, popupMsg: msg, popupYesFunc: func }));
export const closePopup = () => store.dispatch(openSnackbar({ popupOpen: false, popupMsg: "", popupYesFunc: null }));

export function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(String(email).toLowerCase()));
    return re.test(String(email).toLowerCase());
}

export const getMsgYN = (msg, handleYes, noBtn = false) => (
    <Popup>
        <div className='orders__popup'>
            <div className='orders__popup-msg'>{msg}</div>
            {noBtn ? (
                <div className='orders__popup-ok-btn' onClick={() => closePopup()}>
                    OK
                </div>
            ) : (
                <div className='orders__popup-buttons'>
                    <div className='orders__popup-btn' onClick={() => closePopup()}>
                        NO
                    </div>
                    <div
                        className='orders__popup-btn'
                        onClick={() => {
                            handleYes();
                            closePopup();
                        }}>
                        YES
                    </div>
                </div>
            )}
        </div>
    </Popup>
);

export const setUserStatus = (status, value) => store.dispatch(setCurrentUserStatus([status, value]));

export const setUserToken = (token) => store.dispatch(setCurrentUserToken(token));

export const getToken = () => store.getState().userToken;

export const SERVER_URL = "http://localhost:8080/public/";
