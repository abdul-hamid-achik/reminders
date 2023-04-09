import {
  useCreateReminderMutation,
  useGetAllRemindersQuery,
} from "@/spa/services/reminders";

import { useForm } from "react-hook-form";
import { Prisma } from ".prisma/client";
import { useUser } from "@clerk/nextjs";
import ReminderCreateInput = Prisma.ReminderCreateInput;

export default function IndexRoute() {
  const { data = [], isLoading, refetch } = useGetAllRemindersQuery();
  const [create] = useCreateReminderMutation();
  const { register, handleSubmit, reset } = useForm<ReminderCreateInput>();
  const { user, isSignedIn } = useUser();
  const onSubmit = async (data: ReminderCreateInput) => {
    await create({ ...data, userId: user!.id });
    reset();
    await refetch();
  };

  return (
    <main className="-mt-24 pb-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Page title</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 className="sr-only" id="section-1-title">
                Recent reminders
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <ul>
                    {isLoading ? (
                      <li>Loading</li>
                    ) : (
                      data.map((reminder) => (
                        <li key={reminder.id}>{reminder.title}</li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 className="sr-only" id="section-2-title">
                Create a new reminder
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 flex flex-col">
                      <label htmlFor="title">Title</label>
                      <input
                        id="title"
                        {...register("title")}
                        className="rounded-md border border-gray-300 p-2"
                      />
                    </div>

                    <div className="mb-4 flex flex-col">
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        {...register("description")}
                        className="rounded-md border border-gray-300 p-2"
                      />
                    </div>

                    <div className="mb-4 flex flex-col">
                      <label htmlFor="date">Due At</label>
                      <input
                        id="date"
                        type="datetime-local"
                        {...register("dueAt")}
                        className="rounded-md border border-gray-300 p-2"
                      />
                    </div>

                    <div className="mb-4 flex flex-col">
                      <label htmlFor="date">Priority</label>
                      <select
                        id="priority"
                        {...register("priority")}
                        className="rounded-md border border-gray-300 p-2 text-gray-600"
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <button
                        type="submit"
                        className={
                          isSignedIn
                            ? "bg-indigo-600 px-4 py-2 text-white"
                            : "bg-gray-300 px-4 py-2 text-gray-600"
                        }
                        disabled={!isSignedIn}
                      >
                        {isSignedIn ? "Create" : "Sign in to create"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
