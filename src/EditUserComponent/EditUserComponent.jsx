import React, {useEffect, useState} from 'react'
import {userActions} from "../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function EditUserComponent() {

    const editState = useSelector(state => state.edituser);
    const dispatch = useDispatch();

    let userToEdit = JSON.parse(localStorage.getItem('userToEdit'));
    const [id, setId] = useState(userToEdit.id);
    const [firstName, setFirstName] = useState(userToEdit.firstName);
    const [lastName, setLastName] = useState(userToEdit.lastName);
    const [username, setUsername] = useState(userToEdit.username);
    const [password, setPassword] = useState(userToEdit.password);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        let id = userToEdit.id;
        dispatch(userActions.getById(id))
    }, [])

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

    const saveUser = (e) => {
        e.preventDefault();
        setSubmitted(true)
        let user = {
            id, firstName, lastName, username, password
        };
        if (user.firstName && user.lastName && user.username && user.password && user.id) {
            dispatch(userActions.update(user));
        }
    };

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Edit user</h2>
            {editState.loading && <em>Loading user...</em>}
            {editState.error && <span className="text-danger">ERROR: {editState.error}</span>}
            {editState.user &&
            <form name="form" onSubmit={saveUser}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={firstName} onChange={saveFirstName}
                           className={'form-control' + (submitted && !firstName ? ' is-invalid' : '')}/>
                    {submitted && !firstName &&
                    <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={lastName} onChange={saveLastName}
                           className={'form-control' + (submitted && !lastName ? ' is-invalid' : '')}/>
                    {submitted && !lastName &&
                    <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={saveUsername}
                           className={'form-control' + (submitted && !username ? ' is-invalid' : '')}/>
                    {submitted && !username &&
                    <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={savePassword}
                           className={'form-control' + (submitted && !password ? ' is-invalid' : '')}/>
                    {submitted && !password &&
                    <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {/*{registering && <span className="spinner-border spinner-border-sm mr-1"></span>}*/}
                        Save changes
                    </button>
                    <Link to="/" className="btn btn-link">Cancel</Link>
                </div>
            </form>
            }
        </div>
    );
}

export { EditUserComponent };