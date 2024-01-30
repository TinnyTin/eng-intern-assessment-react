import React from 'react'
import StopWatchButton from './StopWatchButton'


export default function StopWatch() {

    const [currentState, setState] = React.useState('');
    const [currentTime, setTime] = React.useState(0);
    const [currentLaps, setLaps] = React.useState([]);
    const intervalRef = React.useRef(null);


    // Divide by time unit
    const sec = Math.floor(currentTime / 1000)
    const min = Math.floor(sec / 60)
    const hour = Math.floor(min / 60)

    // Format double digit representations for each unit of time.
    const millis = (currentTime % 1000).toString().padStart(3,"0")
    const seconds =  (sec % 60).toString().padStart(2,"0")
    const minutes =  (min % 60).toString().padStart(2,"0")
    const hours =  (hour % 24).toString().padStart(2,"0")
    
    // Handles state change from any buttons clicked in StopWatchButton
    function handleChangeState(newValue: string) {
       if(newValue === 'START'){
            startTimer()
       }
       else if(newValue === 'STOP'){
            stopTimer()
       }
       else if(newValue === 'RESET'){
            resetTimer()
       }
       else if(newValue === 'LAP'){
            addLap()
        }
    }

    function startTimer() {
        // If already in the "START" state
        if (currentState === 'START') return;
        setState('START');
        intervalRef.current = setInterval(() => {
            setTime((currentTime) => currentTime + 50);
        }, 50);
    }

    function stopTimer() {
        // If already in the "STOP" state
        if (currentState === 'STOP') return;
        setState('STOP');
        clearInterval(intervalRef.current);
    }

    function resetTimer() {
        // If already in the "RESET" state
        if (currentState === 'RESET') return;
        setState('RESET');
        setTime(0);
        clearInterval(intervalRef.current);
        setLaps([]);
    }

    // Add current time to laps list
    function addLap(){
        const time = {
            'hours':hours,
            'minutes':minutes,
            'seconds':seconds,
            'millis':millis
        };
        setLaps([...currentLaps,time]);
    }

    return(
        <div className="stopwatch">
            <div className="timer">
                <span>{hours}</span>:
                <span>{minutes}</span>:
                <span>{seconds}</span>:
                <span>{millis}</span>
            </div>
            <StopWatchButton changeState={handleChangeState}/>
            <ul className="laps">
                {currentLaps.map((time,i)=>(
                    <li className="lap" key={i}>
                        <span>{time["hours"]}</span>:
                        <span>{time["minutes"]}</span>:
                        <span>{time["seconds"]}</span>:
                        <span>{time["millis"]}</span>
                    </li>
                )    
                )}
            </ul>
        </div>
    )
}