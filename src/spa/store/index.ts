import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Reminder } from "@prisma/client";

const remindersReducer = createSlice({
  name: "reminders",
  initialState: [] as Reminder[],
  reducers: {
    add: (state, action: PayloadAction<Reminder>) => {
      state.push(action.payload);
    },

    remove: (state, action: PayloadAction<Reminder>) => {
      const index = state.findIndex(
        (reminder) => reminder.id === action.payload.id
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },

    update: (state, action: PayloadAction<Reminder>) => {
      const index = state.findIndex(
        (reminder) => reminder.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const store = configureStore({
  reducer: {
    // @ts-ignore
    reminders: remindersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
