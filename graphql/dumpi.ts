// Stub API for controlling coffee drink machine...
// drink machine runs this query on button press, this lets all drink recipes and orders
// to run through the website rather than hosting a server on the drink machine directly
// returns code to activate pumps by pin to make drink
// Needs to be updated to return pins and duration based on drink queue

import { builder } from './builder';
import rpio from 'rpio';
import { db } from '../lib/db';

// Hard coded test drink command
const command: IDumbPiCommand = {
  steps: [
    // {
    //   pins: [
    //     {
    //       pin: 2,
    //       level: rpio.LOW,
    //       mode: rpio.OUTPUT,
    //     },
    //     {
    //       pin: 3,
    //       level: rpio.LOW,
    //       mode: rpio.OUTPUT,
    //     },
    //   ],
    //   duration: 30_000,
    // },
    // {
    //   pins: [
    //     {
    //       pin: 4,
    //       level: rpio.LOW,
    //       mode: rpio.OUTPUT,
    //     },
    //   ],
    //   duration: 2000,
    // },
    // 1 at a time
    // {
    //   pins: [
    //     {
    //       pin: 1,
    //       level: rpio.LOW,
    //       mode: rpio.OUTPUT,
    //     },
    //   ],
    //   duration: 1000,
    // },
    // {
    //   pins: [
    //     {
    //       pin: 2,
    //       level: rpio.LOW,
    //       mode: rpio.OUTPUT,
    //     },
    //   ],
    //   duration: 1000,
    // },
    // {
    //   pins: [
    //     {
    //       pin: 3,
    //       level: rpio.LOW,
    //       mode: rpio.OUTPUT,
    //     },
    //   ],
    //   duration: 1000,
    // },
    // {
    //   pins: [
    //     {
    //       pin: 4,
    //       level: rpio.LOW,
    //       mode: rpio.OUTPUT,
    //     },
    //   ],
    //   duration: 1000,
    // },
    // {
    //   pins: [
    //     {
    //       pin: 5,
    //       level: rpio.LOW,
    //       mode: rpio.OUTPUT,
    //     },
    //   ],
    //   duration: 1000,
    // },
    // {
    //   pins: [
    //     {
    //       pin: 6,
    //       level: rpio.LOW,
    //       mode: rpio.OUTPUT,
    //     },
    //   ],
    //   duration: 1000,
    // },
    // {
    //   pins: [
    //     {
    //       pin: 7,
    //       level: rpio.LOW,
    //       mode: rpio.OUTPUT,
    //     },
    //   ],
    //   duration: 1000,
    // },
    // {
    //   pins: [
    //     {
    //       pin: 8,
    //       level: rpio.LOW,
    //       mode: rpio.OUTPUT,
    //     },
    //   ],
    //   duration: 1000,
    // },
    {
      pins: [
        {
          pin: 1,
          level: rpio.LOW,
          mode: rpio.OUTPUT,
        },
      ],
      duration: 1000,
    },
    {
      pins: [
        {
          pin: 1,
          level: rpio.LOW,
          mode: rpio.OUTPUT,
        },
        {
          pin: 2,
          level: rpio.LOW,
          mode: rpio.OUTPUT,
        },
        {
          pin: 3,
          level: rpio.LOW,
          mode: rpio.OUTPUT,
        },
        {
          pin: 4,
          level: rpio.LOW,
          mode: rpio.OUTPUT,
        },
        {
          pin: 5,
          level: rpio.LOW,
          mode: rpio.OUTPUT,
        },
        {
          pin: 6,
          level: rpio.LOW,
          mode: rpio.OUTPUT,
        },
      ],
      duration: 1000,
    },
  ],
};

enum PinLevel {
  LOW = 0,
  HIGH = 1,
}

enum PinMode {
  INPUT = 0,
  OUTPUT = 1,
  PWM = 2,
}

interface IDumbPiPinState {
  pin: number;
  mode: PinMode;
  level: PinLevel;
}

interface IDumbPiStep {
  pins: IDumbPiPinState[];
  duration: number;
}

interface IDumbPiCommand {
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
    resolve: () => command,
  }),
);
