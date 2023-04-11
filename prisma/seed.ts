import { prisma } from "@/server/db";
import { faker } from "@faker-js/faker";
import { type Prisma } from "@prisma/client";

async function main() {
  const userId =
    process.env.NODE_ENV === "development"
      ? "user_2OD8PDpzzGn0jjbty70GYTf7y3y"
      : "user_2OF282bZH2hDm8YmxrWUAVDfvN5";

  const reminders: Prisma.ReminderCreateManyInput[] = [];
  const priorities = ["LOW", "MEDIUM", "HIGH"];

  for (let i = 0; i < 200; i++) {
    const reminder = {
      title: faker.lorem.words(5),
      description: faker.lorem.sentences(2),
      dueAt: i % 0 ? faker.date.past() : faker.date.future(),
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      userId,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };

    reminders.push(reminder);
  }

  await prisma.reminder.createMany({
    data: reminders,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });

export {};
