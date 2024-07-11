import React, { useState, useEffect } from 'react';
import './Events.scss';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showEditEvent, setShowEditEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // State for create event form
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventPoster, setNewEventPoster] = useState('');
  const [newEventSummary, setNewEventSummary] = useState('');
  const [newEventDate, setNewEventDate] = useState('');

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(storedEvents);
    setLoading(false);
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  const handleCreateEvent = () => {
    setShowCreateEvent(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEditEvent(true);
  };
  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
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
        <h2>All college events</h2>
        <button className="list-event-button" onClick={handleCreateEvent}>List new activity</button>
      </div>
      <div className="events-content">
        {events.map(event => (
          <div className="event-card" key={event.id}>
            <img className="event-card-img" src='./icons/logo.png' alt={event.title} />
            {/* <img className="event-card-img" src={event.poster} alt={event.title} /> */}
            <div className="event-card-date">
              <p className="event-card-para">{formatDate(event.date)}</p>
              <div className="event-buttons">
                <img className="event-edit-button" onClick={() => handleEditEvent(event)} src="/icons/pencil.png" alt="Edit" />
                <img className="event-delete-button" onClick={() => handleDeleteEvent(event.id)} src="/icons/dustbin.png" alt="Quiz" />
              </div>
            </div>

            <h3>{event.title}</h3>

            <p>{event.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCreateEvent = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const newEvent = {
        id: Date.now(),
        title: newEventTitle,
        poster: newEventPoster,
        summary: newEventSummary,
        date: newEventDate
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      setShowCreateEvent(false);
      setNewEventTitle('');
      setNewEventPoster('');
      setNewEventSummary('');
      setNewEventDate('');
    };

    return (
      <div className="create-event">
        <button className="back-button" onClick={() => setShowCreateEvent(false)}>← Back</button>
        <h2>All college events</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enter a title</label>
            <input type="text" value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Poster</label>
            <input type="text" value={newEventPoster} onChange={(e) => setNewEventPoster(e.target.value)} placeholder="Enter image URL" />
          </div>
          <div className="form-group">
            <label>Event summary</label>
            <textarea value={newEventSummary} onChange={(e) => setNewEventSummary(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type='date' value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)}></input>
          </div>

          <button type="submit" className="publish-button">Publish</button>
        </form>
      </div>
    );
  };

  const renderEditEvent = () => {
    const handleSaveChanges = () => {
      const updatedEvents = events.map(event =>
        event.id === selectedEvent.id ? selectedEvent : event
      );
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      setShowEditEvent(false);
    };

    return (
      <div className="edit-event">
        <button className="back-button" onClick={() => setShowEditEvent(false)}>← Back</button>
        <h2>Edit event</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
          <div className="form-group">
            <label>Enter a title</label>
            <input type="text" value={selectedEvent.title} onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input type="date" value={selectedEvent.date} onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Event summary</label>
            <textarea value={selectedEvent.summary} onChange={(e) => setSelectedEvent({ ...selectedEvent, summary: e.target.value })}></textarea>
          </div>
          <div className="form-group">
            <img src={selectedEvent.poster} alt="Poster" />
            <input type="text" value={selectedEvent.poster} onChange={(e) => setSelectedEvent({ ...selectedEvent, poster: e.target.value })} placeholder="Enter new image URL" />
          </div>
          <button type="submit" className="save-changes-button">Save Changes</button>
        </form>
      </div>
    );
  };

  if (loading) {
    return renderNoEvents();
  }

  return (
    <div className="events-page">
      {showCreateEvent ? renderCreateEvent() : showEditEvent ? renderEditEvent() : (events.length === 0 ? renderNoEvents() : renderEvents())}
    </div>
  );
};

export default Events;