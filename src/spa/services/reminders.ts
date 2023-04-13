import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Reminder } from "@prisma/client";
import { Prisma } from "@prisma/client";
import ReminderCreateInput = Prisma.ReminderCreateInput;
import ReminderUpdateInput = Prisma.ReminderUpdateInput;

// Define a service using a base URL and expected endpoints
export const remindersApi = createApi({
  reducerPath: "remindersApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api"
        : "https://www.remindly.dev/api",
  }),
  endpoints: (builder) => ({
    getReminderById: builder.query<Reminder, string>({
      query: (name) => `reminders/${name}`,
    }),

    getAllReminders: builder.query<Reminder[], void>({
      query: () => `reminders`,
    }),

    createReminder: builder.mutation<Reminder, ReminderCreateInput>({
      query: (body) => ({
        url: `reminders`,
        method: "POST",
        body,
      }),
    }),

    updateReminder: builder.mutation<
      Reminder,
      ReminderUpdateInput & Pick<Reminder, "id">
    >({
      query: (body) => ({
        url: `reminders/${body.id}`,
        method: "PUT",
        body,
      }),
    }),

    deleteReminder: builder.mutation<Reminder, Pick<Reminder, "id">>({
      query: (body) => ({
        url: `reminders/${body.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetReminderByIdQuery,
  useGetAllRemindersQuery,
  useCreateReminderMutation,
  useDeleteReminderMutation,
  useUpdateReminderMutation,
} = remindersApi;
