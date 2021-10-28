import { Button, NumberInput, TextInput } from '@mantine/core';
import gql from 'graphql-tag';
import { useState } from 'react';
import { useUpdateIngredientMutation } from '../graphql/__generated__/operations.generated';

interface Drink {
  id: string;
  createdAt: string;
  name: string;
  increment: number;
  max: number;
  unit: string;
  multiplier: number;
  default: number;
  pumps: {
    id: string;
    pin: number;
  }[];
}

gql`
  mutation updateIngredient($input: UpdateDrinkIngredientInput!) {
    updateIngredient(input: $input) {
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
  }
`;

export const IngredientConfigRow = ({ drink, refresh }: { drink: Drink; refresh: () => void }) => {
  const [name, setName] = useState(drink.name);
  const [increment, setIncrement] = useState(drink.increment);
  const [multiplier, setMultiplier] = useState(drink.multiplier);
  const [unit, setUnit] = useState(drink.unit);
  const [max, setMax] = useState(drink.max);
  const [pumps, setPumps] = useState(drink.pumps);
  const [defaultVal, setDefault] = useState(drink.default);

  const [updateIngredient] = useUpdateIngredientMutation({
    onCompleted: () => refresh(),
  });

  return (
    <tr>
      <td>
        <TextInput value={name} onChange={(ev) => setName(ev.target.value)} />
      </td>
      <td>{pumps.map((pump) => pump.pin).join(', ')}</td>
      <td>
        <NumberInput hideControls value={max} onChange={(value) => setMax(value)} />
      </td>
      <td>
        <NumberInput hideControls value={increment} onChange={(value) => setIncrement(value)} />
      </td>
      <td>
        <NumberInput hideControls value={multiplier} onChange={(value) => setMultiplier(value)} />
      </td>
      <td>
        <NumberInput hideControls value={defaultVal} onChange={(value) => setDefault(value)} />
      </td>
      <td>
        <TextInput value={unit} onChange={(ev) => setUnit(ev.target.value)} />
      </td>
      <td>
        <Button
          onClick={() => {
            updateIngredient({
              variables: {
                input: {
                  id: drink.id,
                  name,
                  increment,
                  multiplier,
                  unit,
                  max,
                  default: defaultVal,
                },
              },
            });
          }}
        >
          Update
        </Button>
      </td>
    </tr>
  );
};
