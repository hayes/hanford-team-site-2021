import gql from 'graphql-tag';
import { ReactNode } from 'react';
import { useDrinkAdminQuery } from '../graphql/__generated__/operations.generated';

gql`
  query drinkAdmin {
    drinkIngredients {
      id
      createdAt
      name
      pumps {
        id
        pin
      }
    }
    drinkPumps {
      id
      pin
      ingredient {
        id
        name
        createdAt
      }
    }
  }
`;
export function CoffeeAdmin() {
  const { data, loading, error } = useDrinkAdminQuery({});

  if (loading) {
    return <span>{'Loading...'}</span>;
  }

  if (error) {
    throw error;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
