import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import '../styles/Dashboard.css';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await api.get('/files');
            setFiles(response.data.files || []);
        } catch (err) {
            setError('Failed to fetch files');
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setError('Please select a file');
            return;
        }

        setUploading(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess('File uploaded successfully!');
            setSelectedFile(null);
            setTimeout(() => fetchFiles(), 500);
        } catch (err) {
            setError('Upload failed: ' + (err.response?.data?.message || err.message));
        } finally {
            setUploading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>🏥 Medical Storage Dashboard</h1>
                    <div className="user-info">
                        <span className="user-name">Welcome, {user?.name}!</span>
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="upload-section">
                    <h2>Upload Medical Record</h2>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    <form onSubmit={handleUpload} className="upload-form">
                        <div className="file-input-wrapper">
                            <input
                                type="file"
                                id="file-input"
                                onChange={handleFileSelect}
                                disabled={uploading}
                            />
                            <label htmlFor="file-input" className="file-label">
                                {selectedFile ? selectedFile.name : 'Choose File'}
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="upload-btn"
                            disabled={uploading || !selectedFile}
                        >
                            {uploading ? 'Uploading...' : 'Upload File'}
                        </button>
                    </form>
                </div>

                <div className="files-section">
                    <h2>Your Medical Records</h2>
                    {loading ? (
                        <div className="loading">Loading files...</div>
                    ) : files.length === 0 ? (
                        <div className="no-files">No files uploaded yet</div>
                    ) : (
                        <div className="files-list">
                            {files.map((file, index) => (
                                <div key={index} className="file-item">
                                    <span className="file-icon">📄</span>
                                    <span className="file-name">{file}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
