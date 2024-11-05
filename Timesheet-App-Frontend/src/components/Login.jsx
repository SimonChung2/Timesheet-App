import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Use navigate to programmatically redirect

    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();

                // Store the access token and user data in localStorage
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('user', JSON.stringify({ username, userId: data.userId })); // Storing user data

                // Redirect to the user's account page
                navigate(`/account/${data.userId}`);
            } else {
                // Handle authentication failure
                setErrorMessage('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <input type="submit" value="Submit" className="form-button" />
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}
