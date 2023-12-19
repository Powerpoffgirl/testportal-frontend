import React, { useState } from 'react';
import UserContext from './userContext';

const UserProvider = ({ children }) =>
{
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPic, setUserPic] = useState('');

    const updateUser = (newUserName) =>
    {
        setUserName(newUserName);
    };

    const updateUserEmail = (newUserEmail) =>
    {
        setUserEmail(newUserEmail);
    };

    const updateUserimage = (newUserPic) =>
    {
        setUserPic(newUserPic);
    };


    return (
        <UserContext.Provider value={{ userName, updateUser, userEmail, updateUserEmail, updateUserimage, userPic }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
