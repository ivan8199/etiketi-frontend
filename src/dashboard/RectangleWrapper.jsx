import React from 'react';

import { AddIcon, PlusSquareIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { CONTROL_STATUS } from '../utility/enums';
import DisplayCard from './DisplayCard';

const RectangleWrapper = props => {
  return (
    <Container p={0}>
      <Box bg={'white'} boxShadow={'xl'} borderRadius={'lg'} h="750px">
        <Stack
          py={'3'}
          px={'6'}
          justify="space-between"
          direction={'row'}
          spacing="5"
          textAlign={'start'}
        >
          <Stack spacing="1">
            <Text fontSize={'md'} fontWeight={'medium'}>
              {props.title}
            </Text>
            <Text fontSize={'xs'} color={'gray.600'}>
              {props.subtitle}
            </Text>
          </Stack>
          <Stack spacing="1">
            <Stack spacing="1">
              <Button
                variant={'solid'}
                colorScheme={'blue'}
                size={'sm'}
                leftIcon={<AddIcon fontSize={'0.7rem'} />}
                onClick={() => {
                  props.setRectType(props.rectType);
                  props.setControlStatus(CONTROL_STATUS.DRAW);
                }}
                disabled={props.controlStatus !== CONTROL_STATUS.IDLE}
              >
                Add
              </Button>
              <Button
                variant={'solid'}
                colorScheme={'blue'}
                size={'sm'}
                leftIcon={<PlusSquareIcon fontSize={'0.7rem'} />}
                onClick={() => {
                  props.addRectangle(props.rectType);
                }}
                disabled={props.controlStatus === CONTROL_STATUS.IDLE}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          py={'3'}
          px={'6'}
          justify="space-between"
          direction={'row'}
          spacing="5"
          textAlign={'start'}
        >
          {props.children}
        </Stack>

        <Stack
          pl={'3'}
          pb={'6'}
          spacing={'3'}
          divider={<StackDivider />}
          overflowY={'auto'}
          h={'350px'}
          borderTop={'1px solid #E2E8F0'}
        >
          {props.rectArray.map(rect => {
            return (
              <DisplayCard
                id={rect.id}
                key={rect.id}
                title={rect.txt?.title}
                text={rect.txt?.text}
                selectRectangle={() => props.selectRectangle(rect.id)}
                deleteRectangle={() => props.deleteRectangle(rect.id)}
                currentDisabled={props.currentDisabled}
              />
            );
          })}
        </Stack>
      </Box>
    </Container>
  );
};

export default RectangleWrapper;
