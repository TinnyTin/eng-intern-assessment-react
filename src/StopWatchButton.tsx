import React from 'react'

export default function StopWatchButton({changeState}:{changeState: (state: string) => void}) {
    return(
        <div className="button-container">
            <button onClick={()=>changeState('START')} value="start">Start</button>
            <button onClick={()=>changeState('STOP')} value="stop">Stop</button>
            <button onClick={()=>changeState('RESET')} value="reset">Reset</button>
            <button onClick={()=>changeState('LAP')} value="lap">Lap</button>
        </div>
    )
}