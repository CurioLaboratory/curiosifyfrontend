import React, { useState, useEffect } from 'react';
import './Events.scss';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showEditEvent, setShowEditEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Simulating a fetch request to the backend with dummy data
    setTimeout(() => {
      const dummyData = [
        { id: 1, title: 'CodeQuest - Hackathon', date: '16/03/2024', summary: 'Embark on a coding adventure...', poster: 'path_to_image' }
      ];
      setEvents(dummyData);
      setLoading(false);
    }, 10); // Simulating network delay
  }, []);

  const handleCreateEvent = () => {
    setShowCreateEvent(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEditEvent(true);
  };

  const renderNoEvents = () => (
    <div className="no-events">
      <p>You don't have any events</p>
      <button className="list-event-button" onClick={handleCreateEvent}>List new activity</button>
    </div>
  );

  const renderEvents = () => (
    <div className="events">
      <div className="events-header">
        <h1>All college events</h1>
        <button className="list-event-button" onClick={handleCreateEvent}>List new activity</button>
      </div>
      <div className="events-content">
        {events.map(event => (
          <div className="event-card" key={event.id} onClick={() => handleEditEvent(event)}>
            <img src={event.poster} alt={event.title} />
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            <p>{event.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCreateEvent = () => (
    <div className="create-event">
      <h1>All college events</h1>
      <form>
        <div className="form-group">
          <label>Enter a title</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Poster</label>
          <button type="button">Upload an image</button>
        </div>
        <div className="form-group">
          <label>Event summary</label>
          <textarea></textarea>
        </div>
        <button type="button" className="publish-button">Publish</button>
      </form>
    </div>
  );

  const renderEditEvent = () => (
    <div className="edit-event">
      <button className="back-button" onClick={() => setShowEditEvent(false)}>Back</button>
      <h1>Edit event</h1>
      <form>
        <div className="form-group">
          <label>Enter a title</label>
          <input type="text" value={selectedEvent.title} onChange={(e) => setSelectedEvent({...selectedEvent, title: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="text" value={selectedEvent.date} onChange={(e) => setSelectedEvent({...selectedEvent, date: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Event summary</label>
          <textarea value={selectedEvent.summary} onChange={(e) => setSelectedEvent({...selectedEvent, summary: e.target.value})}></textarea>
        </div>
        <div className="form-group">
          <img src={selectedEvent.poster} alt="Poster" />
          <button type="button">Change poster</button>
        </div>
        <button type="button" className="save-changes-button">Save Changes</button>
      </form>
    </div>
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="events-page">
      {showCreateEvent ? renderCreateEvent() : showEditEvent ? renderEditEvent() : (events.length === 0 ? renderNoEvents() : renderEvents())}
    </div>
  );
};

export default Events;
