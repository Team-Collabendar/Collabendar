const BASE_URL = 'http://localhost:3000';

const api = {
    createCollabendar: async (inputData) => {
        const response = await fetch(`${BASE_URL}/calendar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
        });
        return await response.json();
    },
    invite: async (inputData) => {
        const response = await fetch(`${BASE_URL}/calendar/invite`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
        });
        return await response.json();
    },


};

export default api;
