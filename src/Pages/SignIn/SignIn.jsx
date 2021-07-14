import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { getPopup, validateEmail, setUserToken } from "../../util";
import { connect } from "react-redux";
import { setCurrentUserStatus } from "../../redux/userStatus/userStatus.actions";
import { api } from "../../server";
import "./SignIn.css";

function SignIn({ history, setCurrentUserStatus }) {
    const [email, setEmail] = useState("hafeez@gmail.com");
    const [pass, setPass] = useState("12345678");

    const handleSubmit = async () => {
        if (!validateEmail(email)) {
            getPopup("error", "ENTER VALID EMAIL ID");
            return;
        }
        if (pass.length < 8 || pass.length > 16) {
            getPopup("error", "PASSWORD MUST BE FROM 8 TO 16 CHARACTERS");
            return;
        }
        try {
            const Data = {
                email,
                pass,
            };
            const res = await api.user.signIn(Data);
            localStorage.setItem("email", email);
            if (res.typ === "a") {
                setCurrentUserStatus(["isAdmin", true]);
            } else {
                setCurrentUserStatus(["isAdmin", false]);
            }
            setCurrentUserStatus(["isLoggedIn", true]);
            setUserToken(res.accTok);
        } catch (e) {
            getPopup("error", e?.response?.data?.info);
        }
    };
    return (
        <div className='sign-in'>
            {/* <h1 className='sign-in__title'>SIGN IN</h1> */}
            <div className='sign-in__container'>
                <div className='sign-in__name'>
                    <h3>EMAIL</h3>{" "}
                    <input
                        className='sign-in__input-box'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='type something....'
                    />
                </div>
                <div className='sign-in__password'>
                    <h3>PASSWORD</h3>{" "}
                    <input
                        className='sign-in__input-box'
                        type='password'
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder='type something....'
                    />
                </div>

                <div className='sign-in__btn' onClick={() => handleSubmit()}>
                    SIGN IN
                </div>
                <h4 className='sign-in__sign-up-btn' onClick={() => history.push("/signUp")}>
                    SIGN UP
                </h4>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setCurrentUserStatus: (user) => dispatch(setCurrentUserStatus(user)),
});

export default connect(null, mapDispatchToProps)(withRouter(SignIn));
