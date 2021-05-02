import React, {useEffect, useState} from 'react'
import {userActions} from "../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function EditUserComponent() {

    let userToEdit = JSON.parse(localStorage.getItem('userToEdit'));
    const dispatch = useDispatch();
    const [user, setUser] = useState(userToEdit);
    const [submitted, setSubmitted] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    const saveUser = (e) => {
        e.preventDefault();
        setSubmitted(true)
        if (user.firstName && user.lastName && user.username && user.email && user.roles) {
            dispatch(userActions.update(user));
        }
    };

    if (user === null) {
        return 'Something is no yes...';
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Edit user</h2>
            {user &&
            <form name="form" onSubmit={saveUser}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange}
                           className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')}/>
                    {submitted && !user.firstName &&
                    <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange}
                           className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')}/>
                    {submitted && !user.lastName &&
                    <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange}
                           className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')}/>
                    {submitted && !user.email &&
                    <div className="invalid-feedback">Email is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input disabled={true} type="text" name="username" value={user.username} onChange={handleChange}
                           className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')}/>
                    {submitted && !user.username &&
                    <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Roles</label>
                    <input disabled={true} type="text" name="roles" value={user.roles} onChange={handleChange}
                           className={'form-control' + (submitted && !user.roles ? ' is-invalid' : '')}/>
                    {submitted && !user.roles &&
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