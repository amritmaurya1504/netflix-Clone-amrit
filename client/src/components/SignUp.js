import React, { useRef } from 'react'
import "./Signup.css";
import { auth } from "../firebase";
const SignUp = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(emailRef.current.value,
            passwordRef.current.value ).then((authUser) => {
              alert("Register succefully!!")
            }).catch(error => {
                alert(error.message);
            })
    }

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => console.log(authUser)).catch((err)=> alert(err.message))
    }

    return (
        <div className="signup">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} type="email" placeholder="Email" />
                <input ref={passwordRef} type="password" placeholder="Password" />
                <button type="submit" onClick={signIn}>Sign In</button>
                <h4>
                    <span style={{
                        color: "gray",
                        // fontWeight : "400"
                    }}>New to Netflix? </span>
                    <span style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                        // fontWeight : "400"
                    }} onClick={register}>
                        Sign Up now.
                    </span>
                </h4>
            </form>
        </div>
    )
}

export default SignUp
