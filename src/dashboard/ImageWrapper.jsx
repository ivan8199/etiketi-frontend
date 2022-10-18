import { Button, Text } from '@chakra-ui/react';
import React from 'react';
import { RECT_TYPE } from '../utility/enums';
import RectangleWrapper from './RectangleWrapper';

export const ImageWrapper = props => {
  return (
    <RectangleWrapper
      {...props}
      title={'Images'}
      subtitle={'Upload an image and use it in the label'}
      rectArray={props.rectArray}
      rectType={RECT_TYPE.IMG}
      code={props.rectFormData?.code}
    >
      <Text fontSize={'sm'}>{props.rectFormData?.code}</Text>
      <Button boxShadow={'lg'} width={'50%'} onClick={props.handleImport}>
        Import image
      </Button>
    </RectangleWrapper>
  );
};
