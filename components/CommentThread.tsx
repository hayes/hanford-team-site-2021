import { gql } from '@apollo/client';
import { useState } from 'react';
import {
  useAddCommentMutation,
  useAddImageCommentMutation,
  useCommentThreadQuery,
} from '../graphql/__generated__/operations.generated';
import { useTimeSince } from '../lib/useTimeSince';
import { ImageUpload } from './ImageUpload';

gql`
  query commentThread($id: ID!) {
    commentThread(id: $id) {
      id
      comments {
        id
        createdAt
        name
        comment
        type
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

gql`
  mutation addImageComment($threadId: ID!, $name: String!, $url: String!) {
    addComment(threadId: $threadId, comment: { name: $name, comment: $url, type: "image" }) {
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
  const { data, loading, error, refetch } = useCommentThreadQuery({
    variables: {
      id: props.id,
    },
  });

  const [name, setName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [addComment] = useAddCommentMutation({
    onCompleted: () => {
      setNewComment('');
      refetch();
    },
  });
  const [addImageComment, addImageCommentResult] = useAddImageCommentMutation({
    onCompleted: () => {
      refetch();
    },
  });

  if (loading) {
    return null;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const thread = data!.commentThread;

  return (
    <div className="my-16">
      <h2 className="text-2xl bold my-4">Post a picture or say Hi!</h2>
      <div className="my-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Who are you?
        </label>
        <div className="mt-1">
          <input
            onChange={(ev) => setName(ev.target.value)}
            value={name}
            type="text"
            name="name"
            id="name"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md "
            placeholder="Enter your oldest screen name"
          />
        </div>
      </div>

      {addImageCommentResult.loading ? (
        'Adding comment...'
      ) : (
        <ImageUpload
          disabled={!name}
          onComplete={(url) => {
            addImageComment({
              variables: {
                threadId: props.id,
                url,
                name,
              },
            });
          }}
        />
      )}

      <div className="my-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <div className="mt-1">
          <textarea
            onChange={(ev) => setNewComment(ev.target.value)}
            value={newComment}
            name="comment"
            id="comment"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Say something nice"
          />
        </div>
      </div>

      <button
        type="button"
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-default"
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

      <ol className="my-8">
        {thread.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ol>
    </div>
  );
}

function Comment({
  comment,
}: {
  comment: { createdAt: string; name: string; comment: string; type: string };
}) {
  console.log(comment);
  const timeSince = useTimeSince(new Date(comment.createdAt));
  return (
    <li>
      <div className="relative pt-8 my-8">
        <span className="absolute top-0 left-0 italic block text-sm">
          <span className="font-bold">{comment.name}</span> says:
        </span>

        {comment.type === 'image' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="image-comment"
            className="m-auto max-w-full max-h-[350px]"
            src={comment.comment}
          />
        ) : (
          <span className="block px-16 italic text-lg font-sans">{comment.comment}</span>
        )}
        <span className="float-right text-xs">{timeSince}</span>
      </div>
    </li>
  );
}
