import React, {useEffect, useState} from 'react'
import {userActions} from "../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Input} from "./common/Input";
import {getHandleChange} from "./util/change";
import {DisabledInput} from "./common/DisabledInput";
import {PrimaryButton} from "./common/PrimaryButton";

function EditUserComponent() {

    let userToEdit = JSON.parse(localStorage.getItem('userToEdit'));
    const dispatch = useDispatch();
    const [username, setUsername] = useState(userToEdit.username)
    const [firstName, setFirstName] = useState(userToEdit.firstName)
    const [lastName, setLastName] = useState(userToEdit.lastName)
    const [email, setEmail] = useState(userToEdit.email)
    const [roles, setRoles] = useState(userToEdit.roles)
    const editing = useSelector(state => state.edituser.loading);
    const [submitted, setSubmitted] = useState(false);

    const saveUser = (e) => {
        e.preventDefault();
        setSubmitted(true)
        const user = {firstName, lastName, username, email, roles}
        dispatch(userActions.update(user));
    };

    if (firstName === null) {
        return (
            <div className="col-lg-8 offset-lg-2">
                <h2>Something is no yes...</h2>
                <Link to="/" className="btn btn-link">Go back</Link>
            </div>
        );
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Edit user</h2>
            {firstName &&
            <form name="form" onSubmit={saveUser}>
                <Input name="firstName" value={firstName} submitted={submitted}
                       handleChange={getHandleChange(setFirstName)}/>
                <Input name="lastName" value={lastName} submitted={submitted}
                       handleChange={getHandleChange(setLastName)}/>
                <Input name="email" value={email} submitted={submitted}
                       handleChange={getHandleChange(setEmail)}/>
                <DisabledInput name="username" value={username}/>
                <DisabledInput name="roles" value={roles}/>
                <div className="form-group">
                    <PrimaryButton text="Edit User" isLoading={editing}/>
                    <Link to="/" className="btn btn-link">Cancel</Link>
                </div>
            </form>
            }
        </div>
    );
}

export {EditUserComponent};