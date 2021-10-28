import build from 'next/dist/build';
import { db } from '../lib/db';
import { builder } from './builder';
import { DumbPiCommand } from './dumpi';

builder.prismaObject('DrinkIngredient', {
  findUnique: (drink) => ({ id: drink.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', {
      type: 'DateTime',
    }),
    name: t.exposeString('name'),
    pumps: t.relation('pumps'),
    max: t.exposeInt('max'),
    increment: t.exposeInt('increment'),
    multiplier: t.exposeInt('multiplier'),
    unit: t.exposeString('unit'),
  }),
});

builder.prismaObject('DrinkPump', {
  findUnique: (pump) => ({ id: pump.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    ingredient: t.relation('ingredient'),
    pin: t.exposeInt('pin'),
    enabled: t.exposeBoolean('enabled'),
  }),
});

builder.queryField('drinkIngredients', (t) =>
  t.prismaField({
    type: ['DrinkIngredient'],
    resolve: (query) =>
      db.drinkIngredient.findMany({
        orderBy: { id: 'asc' },
        ...query,
      }),
  }),
);

builder.queryField('drinkPumps', (t) =>
  t.prismaField({
    type: ['DrinkPump'],
    resolve: (query) =>
      db.drinkPump.findMany({
        orderBy: { id: 'asc' },
        ...query,
      }),
  }),
);

builder.mutationField('deleteIngredient', (t) =>
  t.prismaField({
    type: 'DrinkIngredient',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (query, root, args) => db.drinkIngredient.delete({ ...query, where: { id: args.id } }),
  }),
);

builder.mutationField('deletePump', (t) =>
  t.prismaField({
    type: 'DrinkPump',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (query, root, args) => db.drinkPump.delete({ ...query, where: { id: args.id } }),
  }),
);

const DrinkIngredientInput = builder.inputType('DrinkIngredientInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    max: t.int({ required: true }),
    increment: t.int({ required: true }),
    multiplier: t.int({ required: true }),
    unit: t.string({ required: true }),
  }),
});

const UpdateDrinkIngredientInput = builder.inputType('UpdateDrinkIngredientInput', {
  fields: (t) => ({
    id: t.id({ required: true }),
    name: t.string({ required: false }),
    max: t.int({ required: false }),
    increment: t.int({ required: false }),
    multiplier: t.int({ required: false }),
    unit: t.string({ required: false }),
  }),
});

builder.mutationField('createIngredient', (t) =>
  t.prismaField({
    type: 'DrinkIngredient',
    args: {
      input: t.arg({ type: DrinkIngredientInput, required: true }),
    },
    resolve: (query, root, args) =>
      db.drinkIngredient.create({
        ...query,
        data: {
          name: args.input.name,
          max: args.input.max,
          increment: args.input.increment,
          multiplier: args.input.multiplier,
          unit: args.input.unit,
        },
      }),
  }),
);

builder.mutationField('updateIngredient', (t) =>
  t.prismaField({
    type: 'DrinkIngredient',
    args: {
      input: t.arg({ type: UpdateDrinkIngredientInput, required: true }),
    },
    resolve: (query, root, args) =>
      db.drinkIngredient.update({
        where: { id: args.input.id },
        ...query,
        data: {
          name: args.input.name ?? undefined,
          max: args.input.max ?? undefined,
          increment: args.input.increment ?? undefined,
          multiplier: args.input.multiplier ?? undefined,
          unit: args.input.unit ?? undefined,
        },
      }),
  }),
);

const DrinkPumpInput = builder.inputType('DrinkPumpInput', {
  fields: (t) => ({
    pin: t.int({ required: true }),
    enabled: t.boolean({}),
    ingredientId: t.id(),
  }),
});

const UpdateDrinkPumpInput = builder.inputType('UpdateDrinkPumpInput', {
  fields: (t) => ({
    id: t.id({ required: true }),
    pin: t.int({}),
    enabled: t.boolean({}),
    ingredientId: t.id(),
  }),
});

builder.mutationField('createDrinkPump', (t) =>
  t.prismaField({
    type: 'DrinkPump',
    args: {
      input: t.arg({ type: DrinkPumpInput, required: true }),
    },
    resolve: (query, root, args) =>
      db.drinkPump.create({
        ...query,
        data: {
          pin: args.input.pin,
          enabled: args.input.enabled ?? undefined,
          ingredient: args.input.ingredientId
            ? {
                connect: {
                  id: args.input.ingredientId,
                },
              }
            : undefined,
        },
      }),
  }),
);

builder.mutationField('updateDrinkPump', (t) =>
  t.prismaField({
    type: 'DrinkPump',
    args: {
      input: t.arg({ type: UpdateDrinkPumpInput, required: true }),
    },
    resolve: (query, root, args) =>
      db.drinkPump.update({
        ...query,
        where: {
          id: args.input.id,
        },
        data: {
          pin: args.input.pin ?? undefined,
          enabled: args.input.enabled ?? undefined,
          ingredient: args.input.ingredientId
            ? {
                connect: {
                  id: args.input.ingredientId,
                },
              }
            : undefined,
        },
      }),
  }),
);

builder.prismaObject('DrinkOrder', {
  findUnique: (order) => ({ id: order.id }),
  include: {
    command: true,
  },
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    createdAt: t.expose('createdAt', {
      type: 'DateTime',
    }),
    command: t.field({
      type: DumbPiCommand,
      resolve: (order) => JSON.parse(order.command.command),
    }),
  }),
});

builder.queryField('drinkOrders', (t) =>
  t.prismaField({
    type: ['DrinkOrder'],
    resolve: (query) =>
      db.drinkOrder.findMany({
        ...query,
        orderBy: {
          createdAt: 'asc',
        },
      }),
  }),
);
