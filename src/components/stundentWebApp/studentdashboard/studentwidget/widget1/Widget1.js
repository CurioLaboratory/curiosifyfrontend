import React, { Component } from 'react';
import './Widget1.scss'; // Import the SCSS file for styling

class Widget1 extends Component {
    render() {
        const updates = [
            {
                date: 'Today',
                items: [
                    { type: 'quiz', title: 'Electromagnetism' },
                    { type: 'quiz', title: 'Chemical reaction' },
                ],
            },
            {
                date: 'Yesterday',
                items: [
                    { type: 'course', title: 'Laws of motion' },
                   
                ],
            },
        ];

        const iconMapping = {
            quiz: '📄',  
            course: '📝',
        };

        return (
            <div className="widget1">
                <h2>Updates</h2>
                {updates.map((update, index) => (
                    <div key={index}>
                        <h3 className="update-date">{update.date}</h3>
                        {update.items.map((item, idx) => (
                            <div key={idx} className="update-item">
                                <span className="update-icon">{iconMapping[item.type]}</span>
                                <span className="update-text">
                                    {item.type === 'quiz' ? `Quiz on "${item.title}" added` : `New course on "${item.title}" added`}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

export default Widget1;
