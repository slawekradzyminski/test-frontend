import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {userActions} from '../_actions';
import {Input} from "./common/Input";
import {getHandleChange} from "./util/change";
import {PrimaryButton} from "./common/PrimaryButton";

function RegisterPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [roles, setRoles] = useState(['ROLE_CLIENT'])
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        const user = {firstName, lastName, username, password, roles, email}
        dispatch(userActions.register(user));
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Register</h2>
            <form name="form" onSubmit={handleSubmit}>
                <Input name="firstName" value={firstName} submitted={submitted}
                       handleChange={getHandleChange(setFirstName)}/>
                <Input name="lastName" value={lastName} submitted={submitted}
                       handleChange={getHandleChange(setLastName)}/>
                <Input name="username" value={username} submitted={submitted}
                       handleChange={getHandleChange(setUsername)}/>
                <Input name="password" value={password} submitted={submitted} type='password'
                       handleChange={getHandleChange(setPassword)}/>
                <Input name="email" value={email} submitted={submitted}
                       handleChange={getHandleChange(setEmail)}/>
                <div className="form-group">
                    <PrimaryButton text="Register" isLoading={registering}/>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export {RegisterPage};