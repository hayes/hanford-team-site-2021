import { db } from '../util/db';
import { builder } from './builder';

builder.prismaObject('DrinkIngredient', {
  findUnique: (drink) => ({ id: drink.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', {
      type: 'DateTime',
    }),
    name: t.exposeString('name'),
    pumps: t.relation('pumps'),
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
        ...query,
      }),
  }),
);

builder.queryField('drinkPumps', (t) =>
  t.prismaField({
    type: ['DrinkPump'],
    resolve: (query) =>
      db.drinkPump.findMany({
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
