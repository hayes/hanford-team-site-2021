import { db } from "../util/db";
import { builder } from "./builder";
import "./dumpi";

builder.mutationType({});
builder.queryType({});

builder.prismaObject("CommentThread", {
  findUnique: (thread) => ({ id: thread.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    comments: t.relation("comments"),
  }),
});

builder.prismaObject("Comment", {
  findUnique: (thread) => ({ id: thread.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    thread: t.relation("thread"),
    name: t.exposeString("name"),
    comment: t.exposeString("comment"),
  }),
});

builder.queryField("commentThread", (t) =>
  t.prismaField({
    type: "CommentThread",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (query, root, args) =>
      db.commentThread.findUnique({
        ...query,
        where: { id: String(args.id) },
        rejectOnNotFound: true,
      }),
  })
);

const CommentInput = builder.inputType("CommentInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    comment: t.string({ required: true }),
  }),
});

builder.mutationField("createCommentThread", (t) =>
  t.prismaField({
    type: "CommentThread",
    args: {
      comments: t.arg({ type: [CommentInput], required: false }),
    },
    resolve: (query, root, args) =>
      db.commentThread.create({
        ...query,
        data: {
          comments: args.comments
            ? {
                create: args.comments.map(({ comment, name }) => ({
                  name,
                  comment,
                })),
              }
            : undefined,
        },
      }),
  })
);

builder.mutationField("addComment", (t) =>
  t.prismaField({
    type: "CommentThread",
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
          },
        })
        .thread({
          ...query,
        }),
  })
);

export const schema = builder.toSchema({});
