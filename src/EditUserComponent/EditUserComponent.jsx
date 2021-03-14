import React, {useEffect, useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import {userActions} from "../_actions";
import {useDispatch, useSelector} from "react-redux";

function EditUserComponent() {

    const editState = useSelector(state => state.edituser);
    const dispatch = useDispatch();

    let userToEdit = JSON.parse(localStorage.getItem('userToEdit'));
    const [id, setId] = useState(userToEdit.id);
    const [firstName, setFirstName] = useState(userToEdit.firstName);
    const [lastName, setLastName] = useState(userToEdit.lastName);
    const [username, setUsername] = useState(userToEdit.username);
    const [password, setPassword] = useState(userToEdit.password);

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
        let user = {
            id, firstName, lastName, username, password
        };
        if (user.firstName && user.lastName && user.username && user.password && user.id) {
            dispatch(userActions.update(user));
        }
    };

    return (
        <div>
            <Container>
                <Typography variant="h4">Edit User</Typography>
                {editState.loading && <em>Loading user...</em>}
                {editState.error && <span className="text-danger">ERROR: {editState.error}</span>}
                {editState.user &&
                <form>
                    <TextField type="text" placeholder="username" fullWidth margin="normal" name="username"
                               value={username} onChange={saveUsername}/>
                    <TextField placeholder="First Name" fullWidth margin="normal" name="firstName"
                               value={firstName} onChange={saveFirstName}/>
                    <TextField placeholder="Last name" fullWidth margin="normal" name="lastName"
                               value={lastName} onChange={saveLastName}/>
                    <TextField placeholder="Password" fullWidth margin="normal" name="password"
                               value={password} onChange={savePassword}/>
                    <Button variant="contained" color="primary" onClick={saveUser}>Save</Button>
                </form>
                }
            </Container>
        </div>
    );
}

export { EditUserComponent };