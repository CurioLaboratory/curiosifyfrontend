import React, { Component } from 'react';
import './Widget2.scss';

class Widget2 extends Component {
    render() {
        const activities = [
            {
                icon: '📄', 
                text: 'You have successfully completed the quiz on "Evolution"',
                time: '4h',
            },
            {
                icon: '📚',
                text: 'You have submitted the assignment for "Intermolecular"',
                time: '6h',
            },
            {
                icon: '📚',
                text: 'You have attempted a flashcard on "Renewable Energy"',
                time: '7h',
            },
        ];

        return (
            <div className="widget2">
                <div className="header2">
                    <h2>Activity feed</h2>
                    <button className="filter-button">All ▼</button>
                </div>
                <div className="activity-list">
                    {activities.map((activity, index) => (
                        <div key={index} className="activity-item">
                            <span className="activity-icon">{activity.icon}</span>
                            <span className="activity-text">{activity.text}</span>
                            <span className="activity-time">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Widget2;
