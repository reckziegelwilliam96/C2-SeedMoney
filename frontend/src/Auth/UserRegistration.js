import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../store/userActions';

const UserRegistration = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const userData = await dispatch(signup({ firstName, lastName, password, email }));
            navigate(`/register/user/${userData.id}`) 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleRegistration}>
            <label>
                First Name:
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label>
                Last Name:
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <input type="submit" value="Register" />
        </form>
    );
};

export default UserRegistration;
