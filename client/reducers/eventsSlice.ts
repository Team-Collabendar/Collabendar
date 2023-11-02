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
    },
    removeEvent: (state, action: PayloadAction<String>) => {
      state.eventsList = state.eventsList.filter((event) => event.label !== action.payload);
    },
    setEventList: (state, action: PayloadAction<Event[]>) => {
      state.eventsList = action.payload;
    }
  }
})

export const { addEvent, removeEvent, setEventList } = eventSlice.actions;

export default eventSlice.reducer;