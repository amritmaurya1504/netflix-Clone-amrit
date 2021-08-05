import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import "./LoginScreen.css";
import Nav from './Nav';
import SignUp from "./SignUp"
const LoginScreen = () => {
    const [signIn , setSignIn] = useState(false);
    return (
        <div className="loginScreen">
            <div className="loginScreenBg">
                <img
                    className="loginScreen_logo"
                    src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />

                <button className="btn" onClick={() => setSignIn(true)}>Sign In</button>
                <div className="loginscreen_gradient">
                </div>
                <div className="loginscreen_Body">
                    {
                        signIn ? (<SignUp />) : (
                            <>
                                <h1>Unlimited films, TV programmes and more.</h1>
                                <h2>Watch anywhere. Cancle at any time.</h2>
                                <h3>Ready to watch? Enter your email to
                                    create or restart your membership.
                                </h3>
                                <div className="loginScreen_input">
                                    <form>
                                        <input type="email" placeholder="Email Address" />
                                        <button onClick={() => setSignIn(true)} className="btn2">GET STARTED</button>
                                    </form>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div >
    )
}

export default LoginScreen
