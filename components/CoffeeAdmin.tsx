import gql from 'graphql-tag';
import { useDrinkAdminQuery } from '../graphql/__generated__/operations.generated';
import { Divider, Table } from '@mantine/core';
import { IngredientConfigRow } from './IngredientConfigRow';
import { PumpConfigRow } from './PumpConfigRow';
import { DrinkOrderQueue } from './DrinkOrderQueue';
import { TestCommandBuilder } from './TestCommndBuilder';

gql`
  query drinkAdmin {
    drinkIngredients {
      id
      createdAt
      name
      increment
      max
      unit
      multiplier
      default
      pumps {
        id
        pin
      }
    }
    drinkPumps {
      id
      pin
      enabled
      ingredient {
        id
        name
      }
    }
    drinkOrders {
      id
      name
      createdAt
      command {
        steps {
          duration
          pins {
            pin
            ingredient {
              id
              name
            }
          }
        }
      }
    }
  }
`;
export function CoffeeAdmin() {
  const { data, loading, error, refetch } = useDrinkAdminQuery({});

  if (loading) {
    return <span>{'Loading...'}</span>;
  }

  if (error) {
    throw error;
  }

  return (
    <div>
      <Divider my="md" label="Ingredients" labelPosition="center" />
      <Table className="table-fixed">
        <thead>
          <tr>
            <th className="w-36">Name</th>
            <th>Pump(s)</th>
            <th>Max</th>
            <th>Inc</th>
            <th>Mult</th>
            <th>Default</th>
            <th className="w-24">Unit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.drinkIngredients.map((drink) => (
            <IngredientConfigRow refresh={refetch} key={drink.id} drink={{ ...drink }} />
          ))}
        </tbody>
      </Table>
      <Divider my="md" label="Pumps" labelPosition="center" />
      <Table>
        <thead>
          <tr>
            <th>Pin</th>
            <th>Ingredient</th>
            <th>Enabled</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.drinkPumps.map((pump) => (
            <PumpConfigRow
              refresh={refetch}
              key={pump.id}
              pump={pump}
              ingredients={data.drinkIngredients ?? []}
            />
          ))}
        </tbody>
      </Table>
      <Divider my="md" label="Queued commands" labelPosition="center" />
      <DrinkOrderQueue allowDelete />
      <Divider my="md" label="Test command builder" labelPosition="center" />
      <TestCommandBuilder />
    </div>
  );
}
