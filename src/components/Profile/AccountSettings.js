import React, { useState } from 'react';
import './AccountSettings.scss'; // Link to your SCSS file
import { useAuth } from "../auth/AuthContext";
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const AccountSettings = () => {
    const { getUser } = useAuth();
    const user = getUser();

    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

    const handleOpenChangePasswordModal = () => {
        setIsChangePasswordModalOpen(true);
    };

    const handleCloseChangePasswordModal = () => {
        setIsChangePasswordModalOpen(false);
    };

    const handleOpenDeleteAccountModal = () => {
        setIsDeleteAccountModalOpen(true);
    };

    const handleCloseDeleteAccountModal = () => {
        setIsDeleteAccountModalOpen(false);
    };

    return (
        <div>
            <h1 className="heading2">Account settings</h1>
            <div className="account-settings">
                <div className="profile-section">
                    <h2 className="sub-heading">My Profile</h2>
                    <div className="profile-card">
                        <div className="avatar-placeholder">{user.name[0]}</div>
                        <div className="profile-info">
                            <p className="name">{user.name}</p>
                            <p className="email">{user.collegeName}</p>
                        </div>
                    </div>
                </div>

                <div className="account-section">
                    <h3 className="section-heading">Account Security</h3>
                    <div className="section-item">
                        <span>Email</span>
                        <span className="detail">{user.email}</span>
                        <div className=""></div>
                    </div>
                    <div className="section-item">
                        <span>Password</span>
                        <span className="detail">***************</span>
                        <button className="btn change" onClick={handleOpenChangePasswordModal}>Change</button>
                    </div>
                </div>

                <div className="account-section">
                    <h3 className="section-heading">Manage Alerts</h3>
                    <div className="section-item">
                        <span>Email Notifications</span>
                        <div className="toggle-container">
                            <button className="toggle-button active">Yes</button>
                            <button className="toggle-button">No</button>
                        </div>
                    </div>
                </div>

                <div className="account-section">
                    <h3 className="section-heading">Support</h3>
                    <div className="section-item">
                        <span>Terms and conditions</span>
                        <a href="#" className="link">Read Curiosify terms & conditions</a>
                    </div>
                    <div className="section-item delete">
                        <span>Delete my account</span>
                        <button className="btn delete-btn" onClick={handleOpenDeleteAccountModal}>Delete</button>
                    </div>
                </div>
            </div>

            {/* Modal for Change Password */}
            {isChangePasswordModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal" onClick={handleCloseChangePasswordModal}>x</button>
                        <ChangePassword />
                    </div>
                </div>
            )}

            {/* Modal for Delete Account */}
            {isDeleteAccountModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content delete-account-modal">
                        <button className="close-modal" onClick={handleCloseDeleteAccountModal}>x</button>
                        <DeleteAccount onClose={handleCloseDeleteAccountModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountSettings;
