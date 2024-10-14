import React, { useState, useEffect } from 'react';
import './Widget2.scss'; // Import the scss file
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

    // Function to get the icon based on the activity type
    const getActivityIcon = (type) => {
        switch (type) {
            case 'quiz':
                return '📂'; // Placeholder icon for quizzes
            case 'assignment':
                return '📚'; // Placeholder icon for assignments
            case 'event':
                return '📅'; // Placeholder icon for events
            default:
                return '📄'; // Generic document icon
        }
    };

    return (
        <div className="widget2">
            <div className="widget2__header">
                <h2>Activity feed</h2>
                <button className="filter-button">
                    All <span>▼</span>
                </button>
            </div>
            <div className="widget2__activities">
                {activities.length > 0 ? (
                    activities
                        .slice() // Create a shallow copy of the activities array
                        .reverse() // Reverse the copied array
                        .map((activity, index) => (
                            <div key={index} className="activity-item">
                                {/* Dynamically display icon based on activity type */}
                                <div className="icon">
                                    {getActivityIcon(activity.type)}
                                </div>
                                <div className="details">
                                    <span className="type">
                                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                                    </span>
                                    <span className="time">
                                        {new Date(activity.timestamp).toLocaleDateString()}{' '}
                                        {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <p className="description">
                                        {activity.type === 'quiz'
                                            ? `You attempted a quiz on "${activity.title}"`
                                            : activity.type === 'assignment'
                                            ? `You attempted an assignment on "${activity.title}"`
                                            : activity.type === 'event'
                                            ? `You see an event: "${activity.title}"`
                                            : `You performed an action on "${activity.title}"`}
                                    </p>
                                </div>
                            </div>
                        ))
                ) : (
                    <p>No recent activities</p>
                )}
            </div>
        </div>
    );
};

export default Widget2;
