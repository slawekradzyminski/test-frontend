import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {userActions} from '../_actions';
import {Input} from "./common/Input";
import {getHandleChange} from "./util/change";
import {PrimaryButton} from "./common/PrimaryButton";

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false);
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        const {from} = location.state || {from: {pathname: "/"}};
        dispatch(userActions.login(username, password, from));
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Login</h2>
            <form name="form" onSubmit={handleSubmit}>
                <Input name="username" value={username} submitted={submitted}
                       handleChange={getHandleChange(setUsername)}/>
                <Input name="password" value={password} submitted={submitted} type='password'
                       handleChange={getHandleChange(setPassword)}/>
                <div className="form-group">
                    <PrimaryButton text="Login" isLoading={loggingIn}/>
                    <Link to="/register" className="btn btn-link">Register</Link>
                </div>
            </form>
        </div>
    );
}

export {LoginPage};