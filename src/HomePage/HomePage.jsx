import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers';

import { userActions } from '../_actions';

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    const editUser = (user) => {
        localStorage.setItem("userToEdit", JSON.stringify(user));
        history.push('/edit-user');
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user.firstName}!</h1>
            <p className='congrats'>You're logged in! Congratulations :)</p>
            <h3>All registered users:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <ul>
                    {users.items.map((user) =>
                        <li key={user.id}>
                            {user.firstName + ' ' + user.lastName}
                            {
                                user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <span> - <a onClick={() =>
                                        window.confirm("Are you sure you wish to delete this item?") &&
                                        handleDeleteUser(user.id)
                                    } className="text-primary delete">Delete</a></span>
                            }
                            {
                                <span> - <a onClick={() => editUser(user)} className="text-primary edit">Edit</a></span>
                            }
                        </li>
                    )}
                </ul>
            }
            <p>
                <Link id="logout" to="/login">Logout</Link>
            </p>
            <p>
                <Link id="addmore" to="/add-user">Add more users</Link>
            </p>
        </div>
    );
}

export { HomePage };