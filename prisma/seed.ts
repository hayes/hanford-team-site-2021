import faker from "faker";
import { PrismaClient } from "@prisma/client";
import { db } from "../util/db";

const prisma = new PrismaClient();

// Using a fixed date and seed lets us re-seed our DB in a consistent way for testing
const now = Date.UTC(2012, 11, 12);
faker.seed(123);

async function main() {
  await db.commentThread.create({
    data: {
      id: "example",
      comments: {
        create: [
          {
            name: "Michael",
            comment: "Hello, world",
          },
        ],
      },
    },
  });
}

main()
  .then(() => console.log("DB seeded with test data"))
  .catch((error) => {
    console.error(error);
    throw error;
  })
  .finally(() => {
    return prisma.$disconnect();
  });
