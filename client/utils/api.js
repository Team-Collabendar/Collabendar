const BASE_URL = 'http://localhost:3000';

const api = {
    getEvents: async (inputData)  => {
        const response = await fetch(`${BASE_URL}/route/getEvent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
        });
        return await response.json();
    },
    createCollabendar: async (inputData) => {
        const response = await fetch(`${BASE_URL}/route/createCollabendar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
        });
        return await response.json();
    },
    invite: async (inputData) => {
        const response = await fetch(`${BASE_URL}/route/invite`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
        });
        return await response.json();
    },
    createEvent: async (inputData) => {
        const response = await fetch(`${BASE_URL}/route/createEvent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
        });
        return await response.json();
    },

};

export default api;
