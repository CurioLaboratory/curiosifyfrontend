import React, { useEffect, useState } from 'react';
import './Widget1.scss'; // Import the SCSS file for styling
import axiosInstance from '../../../../../axiosInstance';

const Widget1 = () => {
    const [todayNotifications, setTodayNotifications] = useState([]);
    const [otherNotifications, setOtherNotifications] = useState([]);

    // Fetch notifications when the component mounts
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axiosInstance.get("/notification/getallnotification"); // Fetch notifications from the backend
                const data = response.data; // Accessing the data directly from Axios response
                setTodayNotifications(data.todayNotifications); 
                setOtherNotifications(data.otherNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    // Icon mapping for different types of notifications
    const iconMapping = {
        quiz: '📄',
        flashcard: '📚',
        event: '📅',
        course: '📝',
    };

    return (
        <div className="widget1">
            <h2>Updates</h2>

            {/* Today's Notifications */}
            {todayNotifications.length > 0 && (
                <div>
                    <h3 className="update-date">Today</h3>
                    {todayNotifications.map((notification, idx) => (
                        <div key={idx} className="update-item">
                            <span className="update-icon">{iconMapping[notification.type] || '🔔'}</span>
                            <span className="update-text">
                                {notification.message}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Other Notifications */}
            {otherNotifications.length > 0 && (
                <div>
                    <h3 className="update-date">Other</h3>
                    {otherNotifications.map((notification, idx) => (
                        <div key={idx} className="update-item">
                            <span className="update-icon">{iconMapping[notification.type] || '🔔'}</span>
                            <span className="update-text">
                               {notification.message}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Widget1;
