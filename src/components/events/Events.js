import React, { useState, useEffect } from 'react';
import './Events.scss';
import axiosInstance from "../../axiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../auth/AuthContext";
const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showEditEvent, setShowEditEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [refreshEvents, setRefreshEvents] = useState(true);
  const { getUser } = useAuth();
  // State for create event form
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventPoster, setNewEventPoster] = useState('');
  const [newEventSummary, setNewEventSummary] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const user = getUser();
  useEffect(() => {
    const getAllEvents = async () => {
      const response = await axiosInstance.get(`/event/getallevent?email=${user.email}`);
      setEvents(response.data);
      setLoading(false);
    }

    getAllEvents();
  }, [refreshEvents]);

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

  const handleDeleteEvent = async (eventId) => {
    const deletedEvent = await axiosInstance.delete(`/event/deleteevent/${eventId}`);
    toast.error("Event Deleted", {
      position: "top-right",
      autoClose: 1000
    });
    
    // Refresh the events list
    setRefreshEvents(!refreshEvents);
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
        {events.length !== 0 && events.map(event => (
          <div className="event-card" key={event._id}>
            <img className="event-card-img" src='./icons/logo.png' alt={event.title} />
            {/* <img className="event-card-img" src={event.poster} alt={event.title} /> */}
            <div className="event-card-date">
              <p className="event-card-para">{formatDate(event.date)}</p>
              <div className="event-buttons">
                <img className="event-edit-button" onClick={() => handleEditEvent(event)} src="/icons/pencil.png" alt="Edit" />
                <img className="event-delete-button" onClick={() => handleDeleteEvent(event._id)} src="/icons/dustbin.png" alt="Quiz" />
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
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!newEventTitle  || !newEventPoster || !newEventSummary || !newEventDate){
        toast.info("Missing Fields", {
          position: "top-right",
          autoClose: 1000
        });
        return ;
      }
      const newEventDetails = {
        id: Date.now(),
        title: newEventTitle,
        poster: newEventPoster,
        summary: newEventSummary,
        date: newEventDate
      };

      const newEvent = await axiosInstance.post("/event/addevent", {
        poster:newEventPoster,
        title: newEventTitle,
        summary: newEventSummary,
        date: newEventDate 
      });
      console.log(newEvent.data._id)

     //Update activity feed for user event creation
    const userdetail = JSON.parse(localStorage.getItem("user")); // Parse the stored string into an object

    if (userdetail) {
      const UserActivitydetail = {
        userId: userdetail.id,
        email: userdetail.email,
        type: "event",
        title: newEventTitle
      };
    
      console.log(UserActivitydetail);
    
      const UpdateActivityFeed = async () => {
        try {
          const response = await axiosInstance.post("/useractivityFeed/addActivity", UserActivitydetail); // For submitting the quiz
          console.log(response);
        } catch (error) {
          console.error('Error Updating Activity Feed', error);
        }
      };
    
      UpdateActivityFeed();
    } else {
      console.error('User not found in localStorage');
    }
    //

      toast.success("Event Added Successfull", {
        position: "top-right",
        autoClose: 1000
      });
      setShowCreateEvent(false);
      setNewEventTitle('');
      setNewEventPoster('');
      setNewEventSummary('');
      setNewEventDate('');
      setRefreshEvents(!refreshEvents);
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
    const handleSaveChanges = async () => {
      const updatedEvent = await axiosInstance.post(`/event/editevent/${selectedEvent._id}`, {
        title: selectedEvent.title,
        summary: selectedEvent.summary,
        date: selectedEvent.date
      });
      toast.success("Event Edit Successfull", {
        position: "top-right",
        autoClose: 1000
      });
      setShowEditEvent(false);
      setRefreshEvents(!refreshEvents);
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
            <input type="date" value={selectedEvent.date.split("T")[0]} onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })} />
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
    <div className="events-dash">
    <div className="events-page">
      {showCreateEvent ? renderCreateEvent() : showEditEvent ? renderEditEvent() : (events.length === 0 ? renderNoEvents() : renderEvents())}
      <ToastContainer />
    </div>
    </div>
  );
};

export default Events;