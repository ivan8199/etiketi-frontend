import {
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import React from 'react';

const SliderPicker = props => {
  return (
    <FormControl>
      <FormLabel fontSize={'xs'} mb={4}>
        {props.label}
      </FormLabel>
      <Slider
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={e => {
          props.onFormDataChange({ [props.name]: e });
        }}
      >
        <SliderMark
          value={props.value}
          textAlign={'center'}
          fontSize={'0.7rem'}
          bg={'blue.500'}
          color={'white'}
          mt={'-7'}
          ml={'-11'}
          w={'6'}
          borderRadius={'lg'}
        >
          {props.value}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb bgColor={'blue.200'} />
      </Slider>
    </FormControl>
  );
};

export default SliderPicker;
