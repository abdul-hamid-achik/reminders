// src/pages/api/reminders/[id].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "@/server/db";
import HttpStatus from "http-status";
import { type Prisma } from "@prisma/client";

/**
 * @swagger
 * /api/reminders/{id}:
 *   get:
 *     description: Fetch a single reminder by ID
 *     responses:
 *       200:
 *         description: A reminder object
 *       404:
 *         description: Reminder not found
 *       500:
 *         description: Failed to fetch reminder
 *   put:
 *     description: Update a reminder by ID
 *     responses:
 *       200:
 *         description: Successfully updated a reminder
 *       500:
 *         description: Failed to update a reminder
 *   delete:
 *     description: Delete a reminder by ID
 *     responses:
 *       200:
 *         description: Successfully deleted a reminder
 *       500:
 *         description: Failed to delete a reminder
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const reminder = await prisma.reminder.findUnique({
        where: { id: parseInt(id as string) },
        include: { list: true, Notification: true },
      });
      if (!reminder)
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: "Reminder not found." });
      res.status(HttpStatus.OK).json(reminder);
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch reminder." });
    }
  } else if (req.method === "PUT") {
    const data = req.body as Prisma.ReminderUpdateInput;
    try {
      const updatedReminder = await prisma.reminder.update({
        where: { id: parseInt(id as string) },
        data,
      });
      res.status(HttpStatus.OK).json(updatedReminder);
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to update reminder." });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedReminder = await prisma.reminder.delete({
        where: { id: parseInt(id as string) },
      });
      res.status(HttpStatus.OK).json(deletedReminder);
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to delete reminder." });
    }
  } else {
    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json({ error: "Method not allowed." });
  }
}
