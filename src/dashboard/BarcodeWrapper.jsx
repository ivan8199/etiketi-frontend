import { AddIcon, PlusSquareIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  StackDivider,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import { GithubPicker } from 'react-color';
import { CONTROL_STATUS, RECT_TYPE } from './enums';
import TextCard from './TextCard';

export const BarcodeWrapper = props => {
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
              Barcodes
            </Text>
            <Text fontSize={'xs'} color={'gray.600'}>
              Select an area and write in a barcode.
            </Text>
            <FormControl>
              <FormLabel fontSize={'xs'}>Text value</FormLabel>
              <Input
                size={'sm'}
                fontSize={'xs'}
                placeholder="Enter text..."
                rows={2}
                value={props.rectFormData?.barcode}
                onChange={e => {
                  // console.log(e.target.value);
                  props.onFormDataChange({ barcode: e.target.value });
                }}
              />
              <FormLabel fontSize={'xs'}>Rotation</FormLabel>
              <RadioGroup
                onChange={e => {
                  // console.log(e);
                  props.onFormDataChange({ rotation: parseInt(e) });
                }}
                value={props.rectFormData?.rotation}
              >
                <Stack direction="row">
                  <Radio value={0}>0</Radio>
                  <Radio value={90}>90</Radio>
                  <Radio value={180}>180</Radio>
                  <Radio value={270}>270</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </Stack>
          <Stack spacing="1">
            <Stack spacing="1">
              <Button
                variant={'solid'}
                colorScheme={'blue'}
                size={'sm'}
                leftIcon={<AddIcon fontSize={'0.7rem'} />}
                onClick={() => {
                  props.setRectType(RECT_TYPE.BAR);
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
                  props.addRectangle(RECT_TYPE.BAR);
                }}
                disabled={props.controlStatus === CONTROL_STATUS.IDLE}
              >
                Save
              </Button>
            </Stack>
          </Stack>
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
          {props.rectArray.map(barcode => {
            return (
              <TextCard
                id={barcode.id}
                key={barcode.id}
                title={barcode.txt?.title}
                text={barcode.txt?.text}
                selectRectangle={() => props.selectRectangle(barcode.id)}
                deleteRectangle={() => props.deleteRectangle(barcode.id)}
                currentDisabled={props.currentDisabled}
              />
            );
          })}
        </Stack>
      </Box>
    </Container>
  );
};
