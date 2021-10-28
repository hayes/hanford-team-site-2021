import faker from 'faker';
import { PrismaClient } from '@prisma/client';
import { db } from '../lib/db';

const prisma = new PrismaClient();

// Using a fixed date and seed lets us re-seed our DB in a consistent way for testing
const now = Date.UTC(2012, 11, 12);
faker.seed(123);

async function main() {
  await db.commentThread.create({
    data: {
      id: 'example',
      comments: {
        create: [
          {
            name: 'Michael',
            comment: 'Hello, world',
          },
        ],
      },
    },
  });

  const ingredients = [
    {
      name: 'Coldbrew Coffee',
      pin: 1,
    },
    {
      name: 'Oat milk',
      pin: 2,
    },
    {
      name: 'Cream',
      pin: 3,
    },
    {
      name: 'Whiskey',
      pin: 4,
    },
    {
      name: 'Rum',
      pin: 5,
    },
    {
      name: 'Decaf Coffee',
      pin: 6,
    },
  ];

  for (const ingredient of ingredients) {
    await db.drinkIngredient.create({
      data: {
        name: ingredient.name,
        pumps: {
          create: [
            {
              pin: ingredient.pin,
            },
          ],
        },
      },
    });
  }
}

main()
  .then(() => console.log('DB seeded with test data'))
  .catch((error) => {
    console.error(error);
    throw error;
  })
  .finally(() => {
    return prisma.$disconnect();
  });
