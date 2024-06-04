import React, { useEffect, useState } from 'react'
import "./forgotPassword.css"
import { Button, Typography } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../Actions/User';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const { loading, error, message } = useSelector((state) => state.like)
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(forgotPassword(email));
    }

    useEffect(() => {
        if (error) {
            dispatch({ type: "clearError" });
        }
        if (message) {
            dispatch({ type: "clearError" });
        }
    }, [dispatch, message, error]);

    return (
        <div className="forgotPassword">
            <form className="forgotPasswordForm" onSubmit={submitHandler}>
                <Typography variant="h3" style={{ padding: "2vmax", color: 'blue' }}>
                    NetWorks
                </Typography>
                <input type="email" placeholder='Email' required
                    className='forgotPasswordInputs' value={email} onChange={(e) => setEmail(e.target.value)} />

                <Button disabled={loading} type="submit">Generate Token</Button>
            </form>
        </div>
    )
}

export default ForgotPassword;
