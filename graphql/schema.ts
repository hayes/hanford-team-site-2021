import { db } from '../lib/db';
import { builder } from './builder';
import './dumpi';
import './drink-machine';
import './images';

builder.mutationType({});
builder.queryType({});

builder.prismaObject('CommentThread', {
  findUnique: (thread) => ({ id: thread.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    comments: t.relation('comments', {
      query: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    }),
  }),
});

builder.prismaObject('Comment', {
  findUnique: (thread) => ({ id: thread.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    thread: t.relation('thread'),
    name: t.exposeString('name'),
    comment: t.exposeString('comment'),
    type: t.exposeString('type'),
  }),
});

builder.queryField('commentThread', (t) =>
  t.prismaField({
    type: 'CommentThread',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (query, root, args) =>
      db.commentThread.findUnique({
        ...query,
        where: { id: String(args.id) },
        rejectOnNotFound: true,
      }),
  }),
);

const CommentInput = builder.inputType('CommentInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    comment: t.string({ required: true }),
    type: t.string({ required: false }),
  }),
});

builder.mutationField('createCommentThread', (t) =>
  t.prismaField({
    type: 'CommentThread',
    args: {
      comments: t.arg({ type: [CommentInput], required: false }),
    },
    resolve: (query, root, args) =>
      db.commentThread.create({
        ...query,
        data: {
          comments: args.comments
            ? {
                create: args.comments.map(({ comment, name, type }) => ({
                  name,
                  comment,
                  type: type ?? 'text',
                })),
              }
            : undefined,
        },
      }),
  }),
);

builder.mutationField('addComment', (t) =>
  t.prismaField({
    type: 'CommentThread',
    args: {
      threadId: t.arg.id({ required: true }),
      comment: t.arg({ type: CommentInput, required: true }),
    },
    nullable: true,
    resolve: (query, root, args) =>
      db.comment
        .create({
          data: {
            name: args.comment.name,
            comment: args.comment.comment,
            threadId: String(args.threadId),
            type: args.comment.type ?? 'text',
          },
        })
        .thread({
          ...query,
        }),
  }),
);

builder.prismaObject('ViewCount', {
  findUnique: (count) => ({ id: count.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    count: t.exposeInt('count'),
    name: t.exposeString('name'),
  }),
});

builder.mutationField('viewPage', (t) =>
  t.prismaField({
    type: 'ViewCount',
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: async (query, parent, args) => {
      return db.viewCount.upsert({
        ...query,
        where: { name: args.name },
        create: { name: args.name },
        update: {
          count: {
            increment: 1,
          },
        },
      });
    },
  }),
);

builder.queryField('viewCount', (t) =>
  t.prismaField({
    type: 'ViewCount',
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: async (query, parent, args) => {
      return db.viewCount.upsert({
        ...query,
        where: { name: args.name },
        update: {},
        create: { name: args.name },
      });
    },
  }),
);

export const schema = builder.toSchema({});
