import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './W3.scss';
import axiosInstance from './../../../axiosInstance';
import image1 from './asset/quiz.png'
import image2 from './asset/event.png'
const W3 = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const timeAgo = (timestamp) => formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  useEffect(() => {
    const fetchActivityFeed = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/useractivityFeed/getActivity");
        setActivities(response.data || []);
      } catch (error) {
        setError('Error loading activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivityFeed();
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'quiz': return <img src={image1} alt="Quiz Icon" style={{ width: '30px', height: '30px' }}/>;
      case 'assignment': return '📚';
      case 'event': return <img src={image2} alt="Quiz Icon" style={{ width: '30px', height: '30px' }}/>;
      default: return '📄';
    }
  };

  return (
    <div className="activity-feed">
      <div className="activity-feed__header">
        <h2>Activity feed</h2>
        <button className="filter-button">All <span>▼</span></button>
      </div>
      <div className="activity-feed__activities">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : activities.length > 0 ? (
          activities.slice().reverse().map((activity, index) => (
            <div key={index} className="activity fade-in">
              <div className="icon">{getActivityIcon(activity.type)}</div>
              <div className="details">
                <span className="type">
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                </span>
                <span className="time">{timeAgo(activity.timestamp)}</span>
                <p className="description">
                  {activity.type === 'quiz' ? `You created a new quiz on "${activity.title}"` :
                   activity.type === 'assignment' ? `You created an assignment on "${activity.title}"` :
                   activity.type === 'event' ? `You created an event: "${activity.title}"` :
                   `You performed an action on "${activity.title}"`}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No activity</p>
        )}
      </div>
    </div>
  );
};

export default W3;
