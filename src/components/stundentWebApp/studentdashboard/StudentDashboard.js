import React from 'react'
import './StudentDashboard.scss'
import Widget1 from './studentwidget/widget1/Widget1'
import Widget2 from './studentwidget/widget2/Widget2'
import Widget3 from './studentwidget/widget3/Widget3'
import Widget4 from './studentwidget/widget4/Widget4'
const StudentDashboard = () => {
    return (
        <div className="StudentDashboard">
            <div className="widgets">
            <div className="widget">
                <Widget1 />
            </div>
            <div className="widget">
                <Widget2 />        </div>
            <div className="widget">
                <Widget3 />
            </div>
            <div className="widget">
                <Widget4 />
            </div>
            </div>
        </div>
    )
}

export default StudentDashboard