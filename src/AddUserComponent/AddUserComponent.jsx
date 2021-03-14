import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {userActions} from "../_actions";
import {useDispatch} from "react-redux";

function AddUserComponent() {

    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const saveUser = (e) => {
        e.preventDefault();
        let user = {
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
        <div>
            <Container>
                <Typography variant="h4">Add User</Typography>
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
            </Container>
        </div>
    );
}

export { AddUserComponent };