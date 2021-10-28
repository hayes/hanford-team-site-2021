import axios from 'axios';
import gql from 'graphql-tag';
import { useEffect } from 'react';
import {
  useDeleteDrinkOrderQueueMutation,
  useDrinkOrderQueueQuery,
} from '../graphql/__generated__/operations.generated';
import { useTimeSince } from '../lib/useTimeSince';

gql`
  query drinkOrderQueue {
    drinkOrders {
      id
      name
      summary
      createdAt
    }
  }
`;

gql`
  mutation deleteDrinkOrderQueue($id: ID!) {
    deleteOrder(id: $id) {
      id
      name
      summary
      createdAt
    }
  }
`;

export function DrinkOrderQueue({ allowDelete }: { allowDelete?: boolean }) {
  const { data, error, loading, startPolling, stopPolling, refetch } = useDrinkOrderQueueQuery();

  useEffect(() => {
    startPolling(5000);

    return stopPolling;
  }, [startPolling]);

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <h3 className="text-lg">Pending orders:</h3>
      <ol className="list-decimal px-[inherit]">
        {data.drinkOrders.map((order) => (
          <OrderRow key={order.id} order={order} refetch={refetch} allowDelete={allowDelete} />
        ))}
      </ol>
    </>
  );
}

function OrderRow({
  order,
  refetch,
  allowDelete,
}: {
  order: { id: string; name: string; summary: string; createdAt: string };
  allowDelete?: boolean;
  refetch: () => void;
}) {
  const timeSince = useTimeSince(new Date(order.createdAt));
  const [deleteOrder] = useDeleteDrinkOrderQueueMutation({
    onCompleted: () => refetch(),
  });

  return (
    <li className="my-2">
      <span className="font-bold">{order.name}</span>: {order.summary}{' '}
      <span className="font-bold">{timeSince} ago</span>
      {allowDelete && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block text-red-600 mx-2 mb-2 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => deleteOrder({ variables: { id: order.id } })}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
    </li>
  );
}
