import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-page-container">
            <div className="landing-navbar">
                <div className="navbar-content">
                    <h2 className="navbar-title">🏥 Medical Storage</h2>
                </div>
            </div>

            <div className="landing-hero-section">
                <div className="hero-content">
                    <h1 className="hero-main-title">Secure Medical Records Management</h1>
                    <p className="hero-description">
                        Store, manage, and access your medical records with enterprise-grade security and encryption. 
                        Built for healthcare professionals and patients.
                    </p>

                    <div className="hero-cta-buttons">
                        <button 
                            className="cta-btn primary-btn"
                            onClick={() => navigate('/signup')}
                        >
                            Get Started Free
                        </button>
                        <button 
                            className="cta-btn secondary-btn"
                            onClick={() => navigate('/login')}
                        >
                            Sign In
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">🔒</span>
                            <span className="stat-label">Enterprise Security</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">⚡</span>
                            <span className="stat-label">Lightning Fast</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">☁️</span>
                            <span className="stat-label">Cloud Powered</span>
                        </div>
                    </div>
                </div>

                <div className="hero-image">
                    <div className="image-placeholder">
                        <div className="placeholder-icon">📋</div>
                    </div>
                </div>
            </div>

            <div className="landing-features-section">
                <h2>Why Choose Medical Storage?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🛡️</div>
                        <h3>Secure</h3>
                        <p>End-to-end encryption with industry-standard security protocols</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🚀</div>
                        <h3>Fast</h3>
                        <p>Instant access to your medical records anytime, anywhere</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Accessible</h3>
                        <p>Works seamlessly on desktop, tablet, and mobile devices</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">✅</div>
                        <h3>Reliable</h3>
                        <p>99.9% uptime guarantee with regular backups</p>
                    </div>
                </div>
            </div>

            <div className="landing-footer">
                <p>&copy; 2026 Medical Storage. All rights reserved.</p>
            </div>
        </div>
    );
}
