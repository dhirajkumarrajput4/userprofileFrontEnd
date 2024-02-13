import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../config';

function UserDetails() {
    const [userProfile, setUserProfile] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const [otpValidated, setOtpValidated] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (token) {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    };
                    const response = await axios.get(`${BASE_URL}/api/home/user/profile`, config);
                    setUserProfile(response.data);
                } else {
                    console.error('Authentication token is missing.');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSendOtp = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.post(`${BASE_URL}/api/home/user/send`, null, config);
            setOtpSent(true);
            setOtpError('');
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const handleValidateOtp = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post(`${BASE_URL}/api/home/user/validate?otp=${otp}`, null, config);
            if (response.status === 200) {
                setOtpValidated(true);
                setOtpError('');
            }
        } catch (error) {
            setOtpError('Invalid OTP');
            console.error('Error validating OTP:', error);
        }
    };

    return (
        <div>
            <h2>Welcome to the Application!</h2>
            {userProfile && (
                <div>
                    <p>Name: {userProfile.name}</p>
                    <p>Email: {userProfile.email}</p>
                    <p>Phone: {userProfile.phone}</p>
                    <p>Role: {userProfile.role}</p>
                </div>
            )}
            {!otpSent && (
                <button onClick={handleSendOtp}>Send OTP</button>
            )}
            {otpSent && !otpValidated && (
                <div>
                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <button onClick={handleValidateOtp}>Validate OTP</button>
                    {otpError && <p>{otpError}</p>}
                </div>
            )}
        </div>
    );
}

export default UserDetails;
