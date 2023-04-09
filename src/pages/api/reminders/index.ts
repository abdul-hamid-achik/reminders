// src/pages/api/reminders/index.ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "@/server/db";
import HttpStatus from "http-status";
import { Prisma } from "@prisma/client";
import ReminderCreateInput = Prisma.ReminderCreateInput;

/**
 * @swagger
 * /api/reminders:
 *   get:
 *     description: Fetch all reminders
 *     responses:
 *       200:
 *         description: A list of reminders
 *       500:
 *         description: Failed to fetch reminders
 *   post:
 *     description: Create a new reminder
 *     responses:
 *       200:
 *         description: Successfully created a reminder
 *       500:
 *         description: Failed to create a reminder
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const reminder = req.body as ReminderCreateInput;
    try {
      const createdReminder = await prisma.reminder.create({
        data: reminder,
      });
      res.status(HttpStatus.OK).json(createdReminder);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to create reminder." });
    }
  } else if (req.method === "GET") {
    try {
      const reminders = await prisma.reminder.findMany({
        include: { list: true, Notification: true },
      });
      res.status(HttpStatus.OK).json(reminders);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch reminders." });
    }
  } else {
    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json({ error: "Method not allowed." });
  }
}
