import { DumbPiCommand } from '.prisma/client';
import { NextApiHandler } from 'next/types';
import { IDumbPiCommand, PinLevel, PinMode } from '../../graphql/dumpi';
import { db } from '../../lib/db';

export default (async (req, res) => {
  const ingredients =
    (req.headers['accept-additions'] as string)
      ?.split(',')
      .filter(Boolean)
      .map((ingredient) => {
        const [name, value] = ingredient.split(';');

        return [name, Number.parseInt(value, 10)] as [string, number];
      }) ?? [];

  const loadedIngredients = await db.drinkIngredient.findMany({
    where: {
      name: {
        in: ingredients.map(([name]) => name),
      },
    },
    include: {
      pumps: true,
    },
  });

  for (const [name, val] of ingredients) {
    if (!val || Number.isNaN(val)) {
      res.status(400);
      res.send('Invalid ingredient value');

      return;
    }

    if (
      !loadedIngredients
        .find((ingredient) => ingredient.name === name)
        ?.pumps.some((pump) => pump.enabled)
    ) {
      res.status(400);
      res.send(`Invalid ingredient name ${name}`);

      return;
    }
  }

  const command: IDumbPiCommand = {
    steps: [],
  };

  const MAX_PUMPS = 2;
  const remaining = ingredients
    .map(([name, value]) => ({
      name,
      value,
      pumps: loadedIngredients.find((ingredient) => ingredient.name === name)!.pumps,
    }))
    .sort((a, b) => b.value - a.value);

  while (remaining.length > 0) {
    const chunk = remaining.splice(0, MAX_PUMPS);

    const duration = Math.min(
      ...chunk.map((n) => n.value / n.pumps.filter((pump) => pump.enabled).length),
    );

    command.steps.push({
      duration,
      pins: chunk.flatMap((ingredient) =>
        ingredient.pumps.map((pump) => ({
          pin: pump.pin,
          mode: PinMode.OUTPUT,
          level: PinLevel.LOW,
        })),
      ),
    });

    for (let i = chunk.length - 1; i >= 0; i--) {
      const sizeForStep = duration * chunk[i].pumps.filter((pump) => pump.enabled).length;
      if (chunk[i].value > sizeForStep) {
        remaining.unshift({
          ...chunk[i],
          value: chunk[i].value - sizeForStep,
        });
      }
    }
  }

  await db.drinkOrder.create({
    data: {
      name: (req.headers['requested-by'] as string) || 'Anonymous',
      command: {
        create: {
          command: JSON.stringify(command, null, 2),
          type: 'DrinkOrder',
        },
      },
    },
  });

  res.status(201);
  res.send('Drink order placed successfully!');
}) as NextApiHandler;
