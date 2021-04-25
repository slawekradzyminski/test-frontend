import React, {useState} from 'react'
import {userActions} from "../_actions";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

function AddUserComponent() {

    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const saveUser = (e) => {
        e.preventDefault();
        setSubmitted(true)
        const user = {
            id, firstName, lastName, username, password
        };
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.addUser(user));
        }
    };

    const saveFirstName = (event) => {
        setFirstName(event.target.value)
    }

    const saveLastName = (event) => {
        setLastName(event.target.value)
    }

    const saveUsername = (event) => {
        setUsername(event.target.value)
    }

    const savePassword = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Add user</h2>
            <form name="form" onSubmit={saveUser}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={firstName} onChange={saveFirstName} className={'form-control' + (submitted && !firstName ? ' is-invalid' : '')} />
                    {submitted && !firstName &&
                    <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={lastName} onChange={saveLastName} className={'form-control' + (submitted && !lastName ? ' is-invalid' : '')} />
                    {submitted && !lastName &&
                    <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={saveUsername} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
                    {submitted && !username &&
                    <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={savePassword} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                    {submitted && !password &&
                    <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {/*{registering && <span className="spinner-border spinner-border-sm mr-1"></span>}*/}
                        Add user
                    </button>
                    <Link to="/" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { AddUserComponent };