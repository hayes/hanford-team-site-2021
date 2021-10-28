import gql from 'graphql-tag';
import { useEffect } from 'react';
import {
  useViewCountQuery,
  useViewPageMutation,
} from '../graphql/__generated__/operations.generated';

gql`
  mutation viewPage($name: String!) {
    viewPage(name: $name) {
      id
      name
      count
    }
  }
`;

gql`
  query viewCount($name: String!) {
    viewCount(name: $name) {
      id
      name
      count
    }
  }
`;

export function ViewCount({ name }: { name: string }) {
  const { data, startPolling, stopPolling } = useViewCountQuery({
    variables: {
      name,
    },
  });
  const [viewPage] = useViewPageMutation({
    variables: { name },
  });

  useViewPageMutation();

  useEffect(() => {
    viewPage();
    startPolling(5000);

    return stopPolling;
  }, [useViewPageMutation]);

  if (!data) {
    return null;
  }

  return <div>view count: {data.viewCount.count}</div>;
}
