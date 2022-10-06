import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { IconButton, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const DisplayCard = props => {
  return (
    <Stack
      key={props.id}
      justify={'space-between'}
      direction={'row'}
      spacing={'4'}
    >
      <Stack spacing={'0.5'} fontSize={'xs'}>
        <Text
          color={'blue.700'}
          fontWeight="thin"
          textAlign={'start'}
          fontSize={'.67rem'}
        >
          {props.id}
        </Text>
        <Text color={'blue.600'} textAlign={'start'} fontWeight="normal">
          {props.text}
        </Text>
      </Stack>

      <Stack direction={'row'} spacing={'1'}>
        <IconButton
          icon={<EditIcon fontSize="1rem" color={'blue.700'} />}
          variant="ghost"
          onClick={props.selectRectangle}
          disabled={props.currentDisabled}
        />
        <IconButton
          icon={<DeleteIcon fontSize="1rem" color={'blue.700'} />}
          variant="ghost"
          onClick={props.deleteRectangle}
          disabled={props.currentDisabled}
        />
      </Stack>
    </Stack>
  );
};

export default DisplayCard;
