const BASE_URL = 'http://localhost:3000';

export const api = {
    createCollabendar: async (inputData) => {
        const response = await fetch(`${BASE_URL}/route/createGroup`, {
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
    logout: async () => {
      const response = await fetch(`${BASE_URL}/route/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    },
    

};
