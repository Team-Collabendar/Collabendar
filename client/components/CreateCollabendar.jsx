import React from 'react';
import { api } from '../utils/api';

export default function CreateCollabendarModal({ openCheck, onClose }) {
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log('data is: ', data);
        if (data) await api.createCollabendar(data);
    }

    if (!openCheck) return null;
    return (
        <div className="absolute right-0 z-10 mt-15 w-45 origin-top-right bg-white border border-black rounded-lg shadow-lg p-4 flex justify-center items-center">
            <div className="text-center">
                <h2>Create New Collabendar</h2>
                <form onSubmit={handleSubmit} >
                <input name='collabendarName' placeholder='Collabendar Name' className="border p-2 rounded-md" />
                <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
                <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">Close</button>
                </form>
            </div>
        </div>
    );
}
