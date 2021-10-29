import SchemaBuilder from '@giraphql/core';
import PrismaPlugin from '@giraphql/plugin-prisma';
import SimpleObjects from '@giraphql/plugin-simple-objects';
import type PrismaTypes from '@giraphql/plugin-prisma/generated';
import { resolvers } from 'graphql-scalars';
import { db } from '../lib/db';

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    ID: {
      Input: string;
      Output: string;
    };
    DateTime: {
      Input: Date;
      Output: Date;
    };
  };
}>({
  prisma: {
    client: db,
  },
  plugins: [PrismaPlugin, SimpleObjects],
});

builder.addScalarType('DateTime', resolvers.DateTime, {});
