import React, { useState } from 'react';
import api from '../utils/api'

export default function CreateCollabendarModal({ openCheck, onClose }) {
    const [selectedCalendars, setSelectedCalendars] = useState([]);

    const handleCheckboxChange = (calendar) => {
        if (selectedCalendars.includes(calendar)) {
            setSelectedCalendars(selectedCalendars.filter((item) => item !== calendar));
        } else {
            setSelectedCalendars([...selectedCalendars, calendar]);
        }
    };

    const handleSubmit = async (event) => {
        console.log('Selected calendars:', selectedCalendars);
        event.preventDefault();
        onClose();

        const data = new FormData(event.target);
        console.log('data is: ', data);
        if (data) await api.createCollabendar(data);
    };

    if (!openCheck) return null;

    return (
        <div className="absolute right-0 z-10 mt-15 w-45 origin-top-right bg-white border border-black rounded-lg shadow-lg p-4 flex justify-center items-center">
            <div className="text-center">
                <h2>Invite Collaborators</h2>
                <form onSubmit={handleSubmit}>
                    <input name="collabendarName" placeholder="UserName" className="border p-2 rounded-md mt-5" />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Submit
                    </button>
                    <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">
                        Close
                    </button>
                    <div class="flex items-start">
                        <div className="w-1/2">
                            <ol className="mt-3">
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="calendars"
                                            value="Personal Calendar"
                                            checked={selectedCalendars.includes('Personal Calendar')}
                                            onChange={() => handleCheckboxChange('Personal Calendar')}
                                        />
                                        Personal Calendar
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="calendars"
                                            value="Codesmith Calendar"
                                            checked={selectedCalendars.includes('Codesmith Calendar')}
                                            onChange={() => handleCheckboxChange('Codesmith Calendar')}
                                        />
                                        Codesmith Calendar
                                    </label>
                                </li>
                            </ol>
                        </div>
                        <div className="w-1/2">
                            <ol className="mt-3">
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="calendars"
                                            value="Interview Calendar"
                                            checked={selectedCalendars.includes('Interview Calendar')}
                                            onChange={() => handleCheckboxChange('Interview Calendar')}
                                        />
                                        Interview Calendar
                                    </label>
                                </li>
                            </ol>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}