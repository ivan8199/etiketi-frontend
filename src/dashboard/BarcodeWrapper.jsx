import {
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { RECT_TYPE } from '../utility/enums';
import RectangleWrapper from './RectangleWrapper';

export const BarcodeWrapper = props => {
  return (
    <RectangleWrapper
      {...props}
      title={'Barcodes'}
      subtitle={
        'Type your barcode number in the field below, choose the orientation, and draw the barcode by dragging your mouse over the canvas area.'
      }
      rectType={RECT_TYPE.BAR}
      code={props.rectFormData?.code}
    >
      <FormControl>
        <FormLabel fontSize={'xs'}>Text value</FormLabel>
        <Input
          size={'sm'}
          fontSize={'xs'}
          placeholder="Enter text..."
          rows={2}
          value={props.rectFormData?.code}
          onChange={e => {
            props.onFormDataChange({ code: e.target.value });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel fontSize={'xs'}>Rotation</FormLabel>
        <RadioGroup
          onChange={e => {
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
    </RectangleWrapper>
  );
};
