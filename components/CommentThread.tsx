import { gql } from "@apollo/client";
import { useState } from "react";
import { useAddCommentMutation, useCommentThreadQuery } from "../graphql/__generated__/operations.generated";

gql`
  query commentThread($id: ID!) {
    commentThread(id: $id) {
      id
      comments {
        id
        createdAt
        name
        comment
      }
    }
  }
`;

gql`
  mutation addComment($threadId: ID!, $name: String!, $comment: String!) {
    addComment(
      threadId: $threadId
      comment: { name: $name, comment: $comment }
    ) {
      id
      comments {
        id
        name
        comment
        createdAt
      }
    }
  }
`;

export default function CommentThread(props: { id: string }) {
  const [name, setName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [addComment, addCommentResult] = useAddCommentMutation({})

  const { data, loading, error } = useCommentThreadQuery({
    variables: {
      id: props.id,
    },
  });

  if (loading) {
    return (
      <h2>
        <a
          href="#loading"
          aria-hidden="true"
          className="aal_anchor"
          id="loading"
        >
          <svg
            aria-hidden="true"
            className="aal_svg"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fillRule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            ></path>
          </svg>
        </a>
        Loading...
      </h2>
    );
  }

  if (error) {
    console.error(error);
    return null;
  }

  const thread = data!.commentThread;

  return (
    <div>
      <ol>
        {thread.comments.map((comment) => (
          <li key={comment.id}>
            <span style={{ fontWeight: "bold" }}>{comment.name}</span> said:{" "}
            <span style={{ fontStyle: "italic", fontSize: "1.5em" }}>
              {comment.comment}
            </span>{" "}
            at <span>{new Date(comment.createdAt).toLocaleString()}</span>
          </li>
        ))}
      </ol>
      <label>
        Name:{" "}
        <input
          type="text"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
      </label>
      <label>
        Comment:
        <textarea
          value={newComment}
          onChange={(ev) => setNewComment(ev.target.value)}
        />
      </label>
      <button
        onClick={() => {
          addComment({
              variables: {
                  threadId: props.id,
                  name,
                  comment: newComment,
              }
          })
        }}
      >
        Add comment
      </button>
    </div>
  );
}
