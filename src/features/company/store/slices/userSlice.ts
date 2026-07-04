// store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  title: string;
  location: string;
  followers: number;
  connections: number;
  profileImage: string;
}

const initialState: UserState = {
  name: 'Honey Sharma',
  title: 'Co-Founder @Throne8',
  location: 'Bhopal, Madhya Pradesh, India',
  followers: 3282,
  connections: 500,
  profileImage: 'https://i.pinimg.com/736x/f6/61/ea/f661ea61616909838a9fbfeda0d2ea14.jpg',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProfile } = userSlice.actions;
export default userSlice.reducer;