// import React from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../config';

function UserDetails() {
    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Retrieve the token from storage (localStorage, cookie, etc.)
                const token = localStorage.getItem('authToken'); // Adjust as per your token storage
                // Make sure the token exists before making the request
                if (token) {
                    // Include the token in the request headers
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    };
                    // Make the request with the configured headers
                    const response = await axios.get(`${BASE_URL}/api/home/user/profile`, config);
                    setUserProfile(response.data);
                } else {
                    // Handle the case where the token is missing
                    console.error('Authentication token is missing.');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

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
        </div>
      );
}

export default UserDetails;
