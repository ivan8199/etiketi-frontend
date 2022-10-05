import { AddIcon, PlusSquareIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  StackDivider,
  Switch,
  Text,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { GithubPicker } from 'react-color';
import { CONTROL_STATUS, RECT_TYPE } from './enums';
import TextCard from './TextCard';
const colors = [
  '#B80000',
  '#DB3E00',
  '#FCCB00',
  '#008B02',
  '#006B76',
  '#1273DE',
  '#004DCF',
  '#5300EB',
  '#EB9694',
  '#FAD0C3',
  '#FEF3BD',
  '#C1E1C5',
  '#BEDADC',
  '#C4DEF6',
  '#BED3F3',
  '#D4C4FB',
  '#000000',
  '#222222',
  '#444444',
  '#666666',
  '#888888',
  '#AAAAAA',
  '#CCCCCC',
  '#FFFFFF',
];
export const TextCardWrapper = props => {
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
              Textboxes
            </Text>
            <Text fontSize={'xs'} color={'gray.600'}>
              Select an area and write in some text. Edit the font size and
              color.
            </Text>
            <FormControl>
              <FormLabel fontSize={'xs'}>Text value</FormLabel>
              <Textarea
                size={'sm'}
                fontSize={'xs'}
                placeholder="Enter text..."
                rows={2}
                value={props.rectFormData?.text}
                onChange={e => {
                  props.onFormDataChange({ text: e.target.value });
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={'xs'} mb={4}>
                Font size
              </FormLabel>
              <Slider
                min={14}
                max={80}
                value={props.rectFormData?.fontSize}
                onChange={e => {
                  props.onFormDataChange({ fontSize: e });
                }}
              >
                <SliderMark
                  value={props.rectFormData?.fontSize}
                  textAlign="center"
                  fontSize={'0.8rem'}
                  bg="blue.500"
                  color="white"
                  mt="-8"
                  ml="-3"
                  w="6"
                >
                  {props.rectFormData?.fontSize}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={'xs'} mb={4}>
                Font weight
              </FormLabel>
              <Slider
                min={0.01}
                max={4}
                step={0.01}
                value={props.rectFormData?.fontWeight}
                onChange={e => {
                  props.onFormDataChange({ fontWeight: e });
                }}
              >
                <SliderMark
                  value={props.rectFormData?.fontWeight}
                  textAlign="center"
                  fontSize={'0.8rem'}
                  bg="blue.500"
                  color="white"
                  mt="-8"
                  ml="-1"
                  w="6"
                >
                  {props.rectFormData?.fontWeight}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>

            <FormControl>
              <FormLabel fontSize={'xs'} mb={4}>
                Padding
              </FormLabel>
              <Slider
                min={0}
                max={50}
                step={1}
                value={props.rectFormData?.padding}
                onChange={e => {
                  props.onFormDataChange({ padding: e });
                }}
              >
                <SliderMark
                  value={props.rectFormData?.padding}
                  textAlign="center"
                  fontSize={'0.8rem'}
                  bg="blue.500"
                  color="white"
                  mt="-8"
                  ml="-1"
                  w="6"
                >
                  {props.rectFormData?.padding}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={'xs'} mb={4}>
                Border
              </FormLabel>
              <Slider
                min={0}
                max={20}
                step={0.2}
                value={props.rectFormData?.border}
                onChange={e => {
                  props.onFormDataChange({ border: e });
                }}
              >
                <SliderMark
                  value={props.rectFormData?.border}
                  textAlign="center"
                  fontSize={'0.8rem'}
                  bg="blue.500"
                  color="white"
                  mt="-8"
                  ml="-1"
                  w="6"
                >
                  {props.rectFormData?.border}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
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
                  props.setRectType(RECT_TYPE.TXT);
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
                  props.addRectangle(RECT_TYPE.TXT);
                }}
                disabled={props.controlStatus === CONTROL_STATUS.IDLE}
              >
                Save
              </Button>
            </Stack>
            <FormControl>
              <FormLabel fontSize={'xs'}>Font color</FormLabel>
              <GithubPicker
                width={'212px'}
                triangle={'hide'}
                onChange={e => {
                  props.onFormDataChange({ fontColor: e.hex });
                }}
                colors={colors}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={'xs'}>Border color</FormLabel>
              <GithubPicker
                width={'212px'}
                triangle={'hide'}
                onChange={e => {
                  props.onFormDataChange({ borderColor: e.hex });
                }}
                colors={colors}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={'xs'}>Background color</FormLabel>
              <GithubPicker
                width={'212px'}
                triangle={'hide'}
                onChange={e => {
                  props.onFormDataChange({ bgColor: e.hex });
                }}
                colors={colors}
              />
            </FormControl>
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
          {props.rectArray?.map(rect => {
            return (
              <TextCard
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
