import React from 'react'
import './Grid.scss'
import W1 from './widgets/w1/W1'
import W2 from './widgets/w2/W2'
import W3 from './widgets/w3/W3'
import W4 from './widgets/w4/W4'
const Grid = () => {
    return (
        <div className="dashboard">
        <div className="widgets">
            <div className="widget">
                <W1 />
            </div>
            <div className="widget">
                <W2 />        </div>
            <div className="widget">
                <W3 />
            </div>
            <div className="widget">
                <W4 />
            </div>
        </div>
        </div>
    )
}

export default Grid