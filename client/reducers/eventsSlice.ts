import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Event {
  hour: number;
  length: number;
  label: string;
  day: number;
}

export interface eventState {
  events: Event[]
}



const initialState = {
  eventsList: [
    {
      hour: 3,
      length: 2,
      label: 'test',
      day: 2
    }
  ],
}

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.eventsList.push(action.payload);
    }
  }
})

export const { addEvent } = eventSlice.actions;

export default eventSlice.reducer;