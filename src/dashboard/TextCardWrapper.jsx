import { FormControl, FormLabel, Stack, Textarea } from '@chakra-ui/react';
import React from 'react';
import ColorPicker from '../form/ColorPicker';
import SliderPicker from '../form/SliderPicker';
import { RECT_TYPE } from '../utility/enums';
import RectangleWrapper from './RectangleWrapper';

const colorPickers = [
  {
    name: 'fontColor',
    label: 'Font color',
  },
  {
    name: 'borderColor',
    label: 'Border color',
  },
  {
    name: 'bgColor',
    label: 'Background color',
  },
];

const sliderPickers = [
  {
    name: 'fontSize',
    label: 'Font size',
    min: 14,
    max: 80,
    step: 1,
  },
  {
    name: 'fontWeight',
    label: 'Font weight',
    min: 0.01,
    max: 4,
    step: 0.01,
  },
  {
    name: 'padding',
    label: 'Padding',
    min: 0,
    max: 50,
    step: 1,
  },
  {
    name: 'border',
    label: 'Border',
    min: 0,
    max: 20,
    step: 0.2,
  },
];

export const TextCardWrapper = props => {
  return (
    <RectangleWrapper
      {...props}
      title={'Textboxes'}
      subtitle={
        'Type in some text, set the options, and draw the text by dragging your mouse over the canvas area.'
      }
      rectType={RECT_TYPE.TXT}
    >
      <Stack spacing="1" w="50%">
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

        {sliderPickers.map(slider => (
          <SliderPicker
            key={slider.name}
            {...slider}
            onFormDataChange={props.onFormDataChange}
            value={props.rectFormData[slider.name]}
          />
        ))}
      </Stack>
      <Stack spacing="1">
        {colorPickers.map(picker => (
          <ColorPicker
            key={picker.name}
            label={picker.label}
            name={picker.name}
            onFormDataChange={props.onFormDataChange}
          />
        ))}
      </Stack>
    </RectangleWrapper>
  );
};
