import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from '../reducers/eventsSlice';
export default function CreateEventModal({ openCheck, onClose }) {
    const [eventName, setEventName] = useState('');
    const [eventStart, setEventStart] = useState('');
    const [eventDay, setEventDay] = useState('');
    const [eventDuration, setEventDuration] = useState('');
    const [amPm, setamPm] = useState('0');
    const dispatch = useDispatch();

    function addEventObj(hour, length, label, day) {
        dispatch(addEvent({hour: hour, length: length, label: label, day: day}));
    }
      

    async function handleSubmit(event) {
        onClose();
        event.preventDefault();
        
        const data = {
            label: eventName,
            hour: Number(eventStart) + Number(amPm),
            day: eventDay,
            length: eventDuration
        }

        addEventObj(data.hour, data.length, data.label, data.day);

        console.log('data is: ', data);

        // Use the state values or FormData to dispatch an action or make an API call
        dispatch(addEvent({ eventName, eventStart, eventDay, eventDuration }));
        // OR
        // await api.createCollabendar(data);
    }

    if (!openCheck) return null;
    return (
        <div className="absolute right-0 z-10 mt-15 w-45 origin-top-right bg-white border border-black rounded-lg shadow-lg p-4 flex justify-center items-center">
            <div className="text-center">
                <form onSubmit={handleSubmit} >
                    <input name='eventName' value={eventName} placeholder='Event Name' className="border p-2 rounded-md" onChange={(e) => setEventName(e.target.value)} />
                    <div>
                    <input name='eventStart' value={eventStart} placeholder='Event Start' className="border p-2 rounded-md" onChange={(e) => setEventStart(e.target.value)} />
                        <select name='amPm' onChange={(e) => setamPm(e.target.value)}>
                            <option value='0'>AM</option>
                            <option value='12'>PM</option>
                        </select>
                    </div>
                    <select id='eventDaySelect' onChange={(e) => setEventDay(e.target.value)}>
                        <option value="1">Monday</option>
                        <option value="2">Tuesday</option>
                        <option value="3">Wednesday</option>
                        <option value="4">Thursday</option>
                        <option value="5">Friday</option>
                        <option value="6">Saturday</option>
                        <option value="7">Sunday</option>
                    </select>
                    <input name='eventDuration' value={eventDuration} placeholder='Event Duration' className="border p-2 rounded-md" onChange={(e) => setEventDuration(e.target.value)} />
                    <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
                    <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">Close</button>
                </form>
            </div>
        </div>
    );
}