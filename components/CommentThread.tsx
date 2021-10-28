import { gql } from '@apollo/client';
import { useState } from 'react';
import {
  useAddCommentMutation,
  useCommentThreadQuery,
} from '../graphql/__generated__/operations.generated';
import { useTimeSince } from '../lib/useTimeSince';

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
    addComment(threadId: $threadId, comment: { name: $name, comment: $comment }) {
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
  const [name, setName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [addComment, addCommentResult] = useAddCommentMutation({});

  const { data, loading, error } = useCommentThreadQuery({
    variables: {
      id: props.id,
    },
  });

  if (loading) {
    return (
      <h2>
        <a href="#loading" aria-hidden="true" className="aal_anchor" id="loading">
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
      <form>
        <div className="my-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Screen name
          </label>
          <div className="mt-1">
            <input
              onChange={(ev) => setName(ev.target.value)}
              type="text"
              name="name"
              id="name"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter your oldest screen name"
            />
          </div>
        </div>
        <div className="my-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <div className="mt-1">
            <textarea
              onChange={(ev) => setNewComment(ev.target.value)}
              name="comment"
              id="comment"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Say something nice"
            />
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={!newComment || !name}
          onClick={() => {
            addComment({
              variables: {
                threadId: props.id,
                name,
                comment: newComment,
              },
            });
          }}
        >
          Add comment
        </button>
      </form>

      <ol className="my-8">
        {thread.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ol>
    </div>
  );
}

function Comment({ comment }: { comment: { createdAt: string; name: string; comment: string } }) {
  const timeSince = useTimeSince(new Date(comment.createdAt));
  return (
    <li>
      <div className="relative pt-8 my-8">
        <span className="absolute top-0 left-0 italic block text-sm">
          <span className="font-bold">{comment.name}</span> says:
        </span>

        <span className="block px-16 italic text-lg">{comment.comment}</span>
        <span className="float-right text-xs">{timeSince}</span>
      </div>
    </li>
  );
}
