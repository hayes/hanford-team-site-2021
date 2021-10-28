// Stub API for controlling coffee drink machine...
// drink machine runs this query on button press, this lets all drink recipes and orders
// to run through the website rather than hosting a server on the drink machine directly
// returns code to activate pumps by pin to make drink
// Needs to be updated to return pins and duration based on drink queue

import { builder } from './builder';
import { db } from '../lib/db';

export enum PinLevel {
  LOW = 0,
  HIGH = 1,
}

export enum PinMode {
  INPUT = 0,
  OUTPUT = 1,
  PWM = 2,
}

export interface IDumbPiPinState {
  pin: number;
  mode: PinMode;
  level: PinLevel;
}

export interface IDumbPiStep {
  pins: IDumbPiPinState[];
  duration: number;
}

export interface IDumbPiCommand {
  steps: IDumbPiStep[];
}

const DumbPinState = builder.objectRef<IDumbPiPinState>('DumbPinState').implement({
  fields: (t) => ({
    pin: t.exposeInt('pin'),
    mode: t.exposeInt('mode'),
    level: t.exposeInt('level'),
    ingredient: t.prismaField({
      type: 'DrinkIngredient',
      nullable: true,
      resolve: (query, step) =>
        db.drinkIngredient.findFirst({
          ...query,
          where: {
            pumps: {
              some: {
                pin: step.pin,
              },
            },
          },
        }),
    }),
  }),
});

const DumbPiStep = builder.objectRef<IDumbPiStep>('DumbPiStep').implement({
  fields: (t) => ({
    duration: t.exposeInt('duration'),
    pins: t.expose('pins', {
      type: [DumbPinState],
    }),
  }),
});

export const DumbPiCommand = builder.objectRef<IDumbPiCommand>('DumbPiCommand').implement({
  fields: (t) => ({
    steps: t.expose('steps', {
      type: [DumbPiStep],
    }),
  }),
});

builder.queryField('dumbPiCommand', (t) =>
  t.field({
    type: DumbPiCommand,
    nullable: true,
    resolve: async () => {
      const order = await db.drinkOrder.findFirst({
        include: {
          command: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      if (!order) {
        return null;
      }

      await db.drinkOrder.delete({
        where: { id: order.id },
      });

      const command = JSON.parse(order.command.command) as IDumbPiCommand;

      return command;
    },
  }),
);
