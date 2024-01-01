import React from 'react';
import {  useNavigate } from 'react-router-dom';

export const Logout = () => {
    const navigate = useNavigate();

    localStorage.removeItem('accessToken');

    navigate('/');
}
