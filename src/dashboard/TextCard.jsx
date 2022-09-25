import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { IconButton, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const TextCard = props => {
  return (
    <Stack
      key={props.id}
      justify={'space-between'}
      direction={'row'}
      spacing={'4'}
    >
      <Stack spacing={'0.5'} fontSize={'xs'}>
        <Text color={'blue.700'} fontWeight="medium" textAlign={'start'}>
          {props.id}
        </Text>
        <Text color={'blue.600'} textAlign={'start'}>
          {props.text}
        </Text>
      </Stack>

      <Stack direction={'row'} spacing={'1'}>
        <IconButton
          icon={<EditIcon fontSize="1rem" color={'blue.700'} />}
          variant="ghost"
          onClick={props.selectCurrent}
          disabled={props.currentDisabled}
        />
        <IconButton
          icon={<DeleteIcon fontSize="1rem" color={'blue.700'} />}
          variant="ghost"
          onClick={props.deleteSelected}
          disabled={props.currentDisabled}
        />
      </Stack>
    </Stack>
  );
};

export default TextCard;
