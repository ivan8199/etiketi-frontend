import { AddIcon } from '@chakra-ui/icons';
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
  SliderThumb,
  SliderTrack,
  Stack,
  StackDivider,
  Switch,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import TextCard from './TextCard';
export const TextCardWrapper = props => {
  return (
    <Box as={'section'}>
      <Container p={0}>
        <Box
          bg={'white'}
          boxShadow={'xl'}
          borderRadius={'lg'}
          py={'3'}
          px={'6'}
        >
          <Stack spacing={'3'} divider={<StackDivider />}>
            <Stack
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
                    value={props.textValue}
                    onChange={e => {
                      props.onTextChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize={'xs'}>Font size</FormLabel>
                  <Slider defaultValue={12} min={8} max={40}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize={'xs'}>Font weight</FormLabel>
                  <Slider defaultValue={12} min={1} max={3} step={1}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
                {/* <FormControl>
                  <FormLabel fontSize={'xs'}>Font color</FormLabel>
                  <Input type="email" />
                </FormControl> */}
                <FormControl>
                  <FormLabel fontSize={'xs'}>Padding</FormLabel>
                  <NumberInput size={'sm'}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize={'xs'}>Border</FormLabel>
                  <Switch size="sm" />
                </FormControl>
                {/* <FormControl>
                  <FormLabel fontSize={'xs'}>Border color</FormLabel>
                  <Input type="email" />
                </FormControl> */}
              </Stack>
              <Button
                variant={'solid'}
                colorScheme={'blue'}
                size={'sm'}
                leftIcon={<AddIcon fontSize={'0.7rem'} />}
              >
                Add
              </Button>
            </Stack>
            {props.textboxArray.map((experience, id) => {
              return (
                <TextCard
                  id={id}
                  key={id}
                  title={experience.title}
                  text={experience.text}
                />
              );
            })}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
