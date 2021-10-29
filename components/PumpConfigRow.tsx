import { Button, Checkbox, Select } from '@mantine/core';
import gql from 'graphql-tag';
import { useState } from 'react';
import { useUpdatePumpMutation } from '../graphql/__generated__/operations.generated';

interface Pump {
  id: string;
  pin: number;
  ingredient?: {
    id: string;
    name: string;
  } | null;
  enabled: boolean;
}

gql`
  mutation updatePump($input: UpdateDrinkPumpInput!) {
    updateDrinkPump(input: $input) {
      id
      pin
      ingredient {
        id
        name
      }
      enabled
    }
  }
`;

export const PumpConfigRow = ({
  pump,
  ingredients,
  refresh,
}: {
  pump: Pump;
  ingredients: {
    name: string;
    id: string;
  }[];
  refresh: () => void;
}) => {
  const [ingredientId, setIngredientId] = useState(pump.ingredient?.id ?? undefined);
  const [enabled, setEnabled] = useState(pump.enabled);

  const [updatePump] = useUpdatePumpMutation({
    onCompleted: () => refresh(),
  });

  return (
    <tr>
      <td>{pump.pin}</td>
      <td>
        <Select
          value={ingredientId}
          data={ingredients.map((ingredient) => ({
            label: ingredient.name,
            value: ingredient.id,
          }))}
          onChange={(val) => setIngredientId(val)}
          onEmptied={() => setIngredientId(undefined)}
        />
      </td>
      <td>
        <Checkbox checked={enabled} onChange={(ev) => setEnabled(ev.target.checked)} />
      </td>
      <td>
        <Button
          onClick={() => {
            updatePump({
              variables: {
                input: {
                  id: pump.id,
                  ingredientId,
                  enabled,
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
