import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createEvent, deleteEvent, fetchEvents, updateEvent } from "./eventThunk";
import { IFetchEventResponse, IFetchedEventData, IEventInitState } from "types/Event";

const initialState : IEventInitState = {
  event: [],
  loading: true,
  error: null
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // fetch events
      .addCase(fetchEvents.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(fetchEvents.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(fetchEvents.fulfilled, (
        state, action : PayloadAction<  IFetchedEventData | any>
        ) => {
        state.loading = false;
        state.event = action.payload;
      })


      // delete event
      .addCase(deleteEvent.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(deleteEvent.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(deleteEvent.fulfilled, (
        state, action : PayloadAction< any | IFetchEventResponse>
        ) => {
        state.loading = false;
        state.event = state.event.filter((event: any) => event._id !== action.payload.data?._id);
      })

      builder
      // update events
      .addCase(updateEvent.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(updateEvent.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(updateEvent.fulfilled, (
        state, action : PayloadAction<  IFetchEventResponse | any>
        ) => {
        state.loading = false;
        const index = state.event.findIndex(
          (event: any) => event._id === action.payload.data?._id);
        state.event[index] = {
          ...action.payload.data
        }

      })

      // create events
      .addCase(createEvent.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(createEvent.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(createEvent.fulfilled, (
        state, action : PayloadAction<  IFetchEventResponse[] | any >
        ) => {
        state.loading = false;

         state.event.push(action.payload.data);
      })
  },
});

export default eventSlice.reducer;