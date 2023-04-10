import { type Reminder as ReminderProps } from "@prisma/client";
import { useUpdateReminderMutation } from "@/spa/services/reminders";
import { CheckIcon, StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Icon } from "@tremor/react";
import { DateTime } from "luxon";
import Spinner from "@/components/spinner";

function Reminder(props: ReminderProps & { refresh: () => Promise<any> }) {
  const [update, { isLoading }] = useUpdateReminderMutation();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "text-red-500";
      case "MEDIUM":
        return "text-yellow-500";
      case "LOW":
        return "text-green-500";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <span>
        <Icon
          icon={StarIcon}
          className={getPriorityColor(props.priority as string)}
          tooltip={props.priority as string}
          variant="solid"
        />
      </span>
      <p className="text-sm">{props.title}</p>

      <span>
        {props.dueAt ? (
          <p className="text-sm">
            due{" "}
            {DateTime.fromISO(props.dueAt as unknown as string).toRelative()}
          </p>
        ) : (
          <p className="text-sm">No due date</p>
        )}
      </span>

      {props.completedAt && (
        <span>
          <p className="text-sm">
            completed{" "}
            {DateTime.fromISO(
              props.completedAt as unknown as string
            ).toRelative()}
          </p>
        </span>
      )}

      <button
        className="space-between flex flex-row items-center justify-center rounded-md border-2 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        onClick={() => {
          void update({
            id: props.id,
            completedAt: props.completedAt ? null : new Date(),
          }).then(() => props.refresh());
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            Updating <Spinner />{" "}
          </>
        ) : props.completedAt ? (
          <>
            Cancel <XMarkIcon className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            Complete <CheckIcon className="ml-2 h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
}
export default Reminder;
