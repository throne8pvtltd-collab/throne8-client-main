import CompanyService from '@/lib/api/company.service';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type EventStatus = 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled' | 'Scheduled';
export type EventMode = 'Online' | 'Offline' | 'Hybrid';

export interface Event {
  id: string;
  eventId: string;
  _id?: string;
  title: string;
  type: string;
  mode: EventMode;
  status: EventStatus;
  date: string;
  startDate: string;
  endDate?: string;
  location: {               // ← string se object karo
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    venue?: string;
    coordinates?: any;
  };
  capacity: number;
  registered: number;
  registeredCount?: number;
  waitlist: number;
  banner?: string;
  description?: string;
  visibility?: 'Public' | 'Private';
  startTimeOfDay?: string;
  media?: Array<{           // ← add
    url: string;
    type: string;
    isPrimary: boolean;
    _id?: string;
  }>;
  company?: {               // ← add
    _id?: string;
    companyName?: string;
    media?: {
      logo?: { url: string; publicId?: string };
      coverImage?: { url: string; publicId?: string };
    };
  };
  agenda?: Array<{
    time?: string;
    title: string;
    duration?: number;
  }>;
  speakers?: Array<{
    name: string;
    designation?: string;
  }>;
}

interface EventsState {
  items: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  items: [],
  loading: false,
  error: null,
};


export const fetchAllEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await CompanyService.getAllEvents();
      return res.data.events; // array of events
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<Event>) {
      state.items.unshift(action.payload);
    },
    deleteEvent(state, action: PayloadAction<string>) {
      state.items = state.items.filter(e => e.id !== action.payload);
    },
    updateEventStatus(state, action: PayloadAction<{ id: string; status: EventStatus }>) {
      const event = state.items.find(e => e.id === action.payload.id);
      if (event) event.status = action.payload.status;
    },
    setEvents(state, action: PayloadAction<Event[]>) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEvents.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchAllEvents.fulfilled, (s, a) => {
        s.loading = false;
        s.items = a.payload ?? [];
      })
      .addCase(fetchAllEvents.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      });
  },
});

export const {
  addEvent, deleteEvent, updateEventStatus,
  setEvents, setLoading, setError,
} = eventsSlice.actions;

export default eventsSlice.reducer;