import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/types';

type UserDetail = {
  user: User | null;
};
const initialState: UserDetail = { user: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserProfile } = userSlice.actions;
export default userSlice.reducer;
