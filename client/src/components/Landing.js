import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Landing.css';

export default function Landing() {
    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signup, login } = useAuth();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error caught:', err);
            setError(err.message || 'Login failed - please check backend server is running');
        } finally {
            setLoading(false);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await signup(email, password, name);
            navigate('/dashboard');
        } catch (err) {
            console.error('Signup error caught:', err);
            setError(err.message || 'Signup failed - please check backend server is running');
        } finally {
            setLoading(false);
        }
    };

    const switchTab = (tab) => {
        setActiveTab(tab);
        setError('');
        // Clear form
        setEmail('');
        setPassword('');
        setName('');
        setConfirmPassword('');
    };

    return (
        <div className="landing-container">
            <div className="landing-hero">
                <div className="hero-content">
                    <h1 className="hero-title">🏥 Medical Storage</h1>
                    <p className="hero-subtitle">Secure Medical Records Management System</p>
                    <p className="hero-description">Upload, manage, and access your medical records securely with advanced encryption and authentication</p>
                </div>
            </div>

            <div className="landing-card">
                <div className="tab-container">
                    <button
                        className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => switchTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
                        onClick={() => switchTab('signup')}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="tab-content">
                    {error && <div className="error-message">{error}</div>}

                    {/* LOGIN TAB */}
                    {activeTab === 'login' && (
                        <form onSubmit={handleLoginSubmit} className="auth-form">
                            <h2>Welcome Back</h2>
                            <p className="form-subtitle">Sign in to access your medical records</p>

                            <div className="form-group">
                                <label htmlFor="login-email">Email Address</label>
                                <input
                                    id="login-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="login-password">Password</label>
                                <input
                                    id="login-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <button type="submit" className="auth-button" disabled={loading}>
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>

                            <p className="form-footer">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    className="tab-switch-link"
                                    onClick={() => switchTab('signup')}
                                >
                                    Create one here
                                </button>
                            </p>
                        </form>
                    )}

                    {/* SIGNUP TAB */}
                    {activeTab === 'signup' && (
                        <form onSubmit={handleSignupSubmit} className="auth-form">
                            <h2>Create Account</h2>
                            <p className="form-subtitle">Join us to start managing your medical records securely</p>

                            <div className="form-group">
                                <label htmlFor="signup-name">Full Name</label>
                                <input
                                    id="signup-name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="signup-email">Email Address</label>
                                <input
                                    id="signup-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="signup-password">Password</label>
                                <input
                                    id="signup-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password (min 6 characters)"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="signup-confirm-password">Confirm Password</label>
                                <input
                                    id="signup-confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm password"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <button type="submit" className="auth-button" disabled={loading}>
                                {loading ? 'Creating account...' : 'Create Account'}
                            </button>

                            <p className="form-footer">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    className="tab-switch-link"
                                    onClick={() => switchTab('login')}
                                >
                                    Sign in here
                                </button>
                            </p>
                        </form>
                    )}
                </div>

                <div className="landing-footer">
                    <p>🔒 Your data is encrypted and secure</p>
                </div>
            </div>
        </div>
    );
}
