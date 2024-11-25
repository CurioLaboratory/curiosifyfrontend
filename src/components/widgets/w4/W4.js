import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import DatePicker from 'react-datepicker'; // Import DatePicker
import './W4.scss';
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles
import { useAuth } from "../../auth/AuthContext";
const W4 = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const { getUser } = useAuth();
    const user = getUser();
    // Helper function to format date to YYYY-MM-DD
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    // Function to get the start of the current week (Sunday)
    const getWeekStart = (date) => {
        const start = new Date(date);
        start.setDate(date.getDate() - date.getDay());
        return start;
    };

    // Get the week dates (starting from Sunday)
    const getWeekDates = (startDate) => {
        const week = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            week.push(date);
        }
        return week;
    };

    // Fetch events when selectedDate changes
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axiosInstance.get(`/event/getallevent?email=${user.email}`);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, [selectedDate]);

    // Get current week dates based on selected date
    const weekStart = getWeekStart(selectedDate);
    const weekDates = getWeekDates(weekStart);

    // Handler for moving forward/backward by 7 days
    const handleWeekChange = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        setSelectedDate(newDate);
    };

    return (
        <div className="schedule-container">
            <h2 className="schedule-title">Schedule</h2>
            {/* Display month and year, click to open calendar */}
            <div className="month-year" onClick={() => setShowCalendar(!showCalendar)}>
                {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
            </div>

            {/* Show calendar when month/year is clicked */}
            <div className="calendar-container">
    {showCalendar && (
        <div className="datepicker-wrapper">
            <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                    setSelectedDate(date);
                    setShowCalendar(false);
                }}
                inline
                showMonthYearPicker
            />
        </div>
    )}
</div>

            {/* Week Carousel */}
            <div className="week-carousel">
                <button className="arrow left-arrow" onClick={() => handleWeekChange(-7)}>
                    &lt;
                </button>
                {weekDates.map((date) => (
                    <div 
                        key={date} 
                        className={`week-date ${formatDate(date) === formatDate(selectedDate) ? 'selected' : ''}`}
                        onClick={() => setSelectedDate(date)}
                    >
                        <div className="day">{date.toLocaleString('default', { weekday: 'short' }).toUpperCase()}</div>
                        <div className="date">{date.getDate()}</div>
                    </div>
                ))}
                <button className="arrow right-arrow" onClick={() => handleWeekChange(7)}>
                    &gt;
                </button>
            </div>

            {/* Events List */}
            <div className="upcoming-events">
    <h4>Upcoming events</h4>
    {events.length > 0 ? (
        <>
            {events.filter((event) => formatDate(new Date(event.date)) === formatDate(selectedDate)).length > 0 ? (
                <ul className="event-list">
                    {events
                        .filter((event) => formatDate(new Date(event.date)) === formatDate(selectedDate))
                        .map((event) => (
                            <li key={event._id} className="event-item">
                                <h5>{event.title}</h5>
                                <p>{event.summary}</p>
                                <p>{new Date(event.date).toDateString()}</p>
                            </li>
                        ))}
                </ul>
            ) : (
                <p className="no-events">No Events Scheduled </p>
            )}
        </>
    ) : (
        <p className="no-events">No Events Scheduled</p>
    )}
</div>

        </div>
    );
};

export default W4;
