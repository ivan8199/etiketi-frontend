import { FormControl, FormLabel } from '@chakra-ui/react';
import React from 'react';
import { GithubPicker } from 'react-color';
import { colors } from '../utility/utils';

const ColorPicker = props => {
  return (
    <FormControl>
      <FormLabel fontSize={'xs'}>{props.label}</FormLabel>
      <GithubPicker
        width={'212px'}
        triangle={'hide'}
        onChange={e => {
          props.onFormDataChange({ [props.name]: e.hex });
        }}
        colors={colors}
      />
    </FormControl>
  );
};

export default ColorPicker;
