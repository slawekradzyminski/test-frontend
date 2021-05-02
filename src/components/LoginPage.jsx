import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {userActions} from '../_actions';
import {validateField} from "../_helpers/field-validator";

function LoginPage() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const {username, password} = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const {name, value} = e.target;
        setInputs(inputs => ({...inputs, [name]: value}));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (!validateField(username) && !validateField(password)) {
            const {from} = location.state || {from: {pathname: "/"}};
            dispatch(userActions.login(username, password, from));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Login</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleChange}
                           className={'form-control' + (submitted && validateField(username) ? ' is-invalid' : '')}/>
                    {submitted && validateField(username) &&
                    <div className="invalid-feedback">Username must be 4 characters or more</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handleChange}
                           className={'form-control' + (submitted && validateField(password) ? ' is-invalid' : '')}/>
                    {submitted && validateField(password) &&
                    <div className="invalid-feedback">Password must be 4 characters or more</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {loggingIn && <span className="spinner-border spinner-border-sm mr-1"/>}
                        Login
                    </button>
                    <Link to="/register" className="btn btn-link">Register</Link>
                </div>
            </form>
        </div>
    );
}

export {LoginPage};