import React, {useEffect, useState} from 'react'
import {userActions} from "../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function EditUserComponent() {

    const edituser = useSelector(state => state.edituser);
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        firstName: edituser.firstName,
        lastName: edituser.lastName,
        username: edituser.username,
        email: edituser.email,
        roles: edituser.roles
    });

    const {username, email, firstName, lastName, roles} = user;
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        let userToEdit = JSON.parse(localStorage.getItem('userToEdit'));
        dispatch(userActions.getByUsername(userToEdit.username))
    }, [])

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    const saveUser = (e) => {
        e.preventDefault();
        setSubmitted(true)
        let user = {
            firstName, lastName, username, email, roles
        };
        if (user.firstName && user.lastName && user.username && user.email && user.roles) {
            dispatch(userActions.update(user));
        }
    };

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Edit user</h2>
            {edituser.loading && <em>Loading user...</em>}
            {edituser.error && <span className="text-danger">ERROR: {edituser.error}</span>}
            {edituser.firstName &&
            <form name="form" onSubmit={saveUser}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={firstName} onChange={handleChange}
                           className={'form-control' + (submitted && !firstName ? ' is-invalid' : '')}/>
                    {submitted && !firstName &&
                    <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={lastName} onChange={handleChange}
                           className={'form-control' + (submitted && !lastName ? ' is-invalid' : '')}/>
                    {submitted && !lastName &&
                    <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" value={email} onChange={handleChange}
                           className={'form-control' + (submitted && !email ? ' is-invalid' : '')}/>
                    {submitted && !email &&
                    <div className="invalid-feedback">Email is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input disabled={true} type="text" name="username" value={username} onChange={handleChange}
                           className={'form-control' + (submitted && !username ? ' is-invalid' : '')}/>
                    {submitted && !username &&
                    <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Roles</label>
                    <input disabled={true} type="text" name="roles" value={roles} onChange={handleChange}
                           className={'form-control' + (submitted && !email ? ' is-invalid' : '')}/>
                    {submitted && !email &&
                    <div className="invalid-feedback">Email is required</div>
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