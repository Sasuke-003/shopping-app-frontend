import React, { useState } from "react";
import "./SignUp.css";
import { withRouter } from "react-router-dom";
import { getPopup, validateEmail } from "../../util";
import { api } from "../../server";

function SignUp({ history }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [rPass, setRPass] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async () => {
        if (name === "" || pass === "" || rPass === "") {
            getPopup("error", "FILL ALL THE FIELDS");
            return;
        }
        if (name.length < 4 || name.length > 16) {
            getPopup("error", "NAME MUST BE FROM 4 TO 16 CHARACTERS");
            return;
        }
        if (!validateEmail(email)) {
            getPopup("error", "ENTER VALID EMAIL ID");
            return;
        }
        if (phone.length !== 10) {
            getPopup("error", "PHONE NUMBER MUST BE 10 NUMBERS");
            return;
        }
        if (pass.length < 8 || pass.length > 16) {
            getPopup("error", "PASSWORD MUST BE FROM 8 TO 16 CHARACTERS");
            return;
        }
        if (pass !== rPass) {
            getPopup("error", "BOTH PASSWORDS MUST MATCH");
            return;
        }
        if (process.env.REACT_APP_SHOP_ID === undefined) {
            getPopup("error", "Something wrong with the website contact admin");
            return;
        }
        try {
            const Data = {
                name,
                email,
                pass,
                phone,
            };
            await api.user.signUp(Data, process.env.REACT_APP_SHOP_ID);
            getPopup("success", "signed up successfully");
            window.location.reload();
        } catch (e) {
            getPopup("error", e?.response?.data?.info);
        }
    };

    return (
        <div className='sign-up'>
            {/* <h1 className='sign-up__title'>SIGN IN</h1> */}
            <div className='sign-up__container'>
                <div className='sign-up__name'>
                    <h3>NAME</h3>{" "}
                    <input
                        className='sign-up__input-box'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='type something....'
                    />
                </div>
                <div className='sign-up__name'>
                    <h3>Phone</h3>{" "}
                    <input
                        className='sign-up__input-box'
                        type='number'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder='type something....'
                    />
                </div>
                <div className='sign-up__name'>
                    <h3>EMAIL</h3>{" "}
                    <input
                        className='sign-up__input-box'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='type something....'
                    />
                </div>
                <div className='sign-up__name'>
                    <h3>PASSWORD</h3>{" "}
                    <input
                        className='sign-up__input-box'
                        type='password'
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder='type something....'
                    />
                </div>
                <div className='sign-up__password'>
                    <h3>RE ENTER PASSWORD</h3>{" "}
                    <input
                        className='sign-up__input-box'
                        type='text'
                        value={rPass}
                        onChange={(e) => setRPass(e.target.value)}
                        placeholder='type something....'
                    />
                </div>

                <div className='sign-up__btn' onClick={() => handleSubmit()}>
                    SIGN UP
                </div>
                <h4 className='sign-up__sign-in-btn' onClick={() => history.push("/signIn")}>
                    SIGN IN
                </h4>
            </div>
        </div>
    );
}

export default withRouter(SignUp);
