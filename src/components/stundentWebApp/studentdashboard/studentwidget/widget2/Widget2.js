import React, { useState, useEffect } from 'react';
import './Widget2.scss';
import axiosInstance from '../../../../../axiosInstance';

const Widget2 = () => {
    // State to store the fetched activities
    const [activities, setActivities] = useState([]);

    // Fetch activity feed on component mount
    useEffect(() => {
        const fetchActivityFeed = async () => {
            try {
                const response = await axiosInstance.get("/useractivityFeed/getActivity");
                const data = response.data; // Access activities data from the response
                setActivities(data || []); // Ensure activities is always an array
            } catch (error) {
                console.error('Error fetching activity feed:', error);
            }
        };

        fetchActivityFeed(); // Call the function when component mounts
    }, []);

    return (
        <div className="widget2">
            <div className="header2">
                <h2>Activity feed</h2>
                <button className="filter-button">All ▼</button>
            </div>
            <div className="activity-list">
                {activities.length > 0 ? (
                    activities
                        .slice() // Create a shallow copy of the activities array
                        .reverse() // Reverse the copied array
                        .map((activity, index) => (
                            <div key={index} className="activity-item">
                                {/* Display icon based on type, you can customize this logic */}
                                <span className="activity-icon">
                                    {activity.type === 'quiz' ? '📄' : activity.type === 'assignment' ? '📚' : '📚'}
                                </span>
                                <span className="activity-text">
                                    You have {activity.type === 'quiz' ? 'completed the quiz on title' : activity.type === 'assignment' ? 'submitted the assignment for' : 'attempted a flashcard on title '} "{activity.title}"
                                </span>
                                <span className="activity-time">
                                    {/* Format the date and time */}
                                    {new Date(activity.timestamp).toLocaleDateString()}{' '}
                                    {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))
                ) : (
                    <p>No recent activities</p> // In case there are no activities
                )}
            </div>
        </div>
    );
};

export default Widget2;
