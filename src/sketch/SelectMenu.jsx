import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { apiurl } from '../utility/utils';

const SelectMenu = props => {
  const [selectedPageNumber, setSelectedPageNumber] = useState('1');

  const create = () => {
    const canvas = document.getElementById('defaultCanvas0');
    canvas.toBlob(async blob => {
      console.log(blob);
      var formData = new FormData();
      formData.append('canvas', blob);
      formData.append('template', props.selectedTemplate);
      formData.append('pages', selectedPageNumber);

      axios
        .post(`${apiurl}download`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob',
        })
        .then(response => {
          const href = URL.createObjectURL(
            new Blob([response.data], { type: 'application/pdf' })
          );

          const link = document.createElement('a');
          link.href = href;
          // TODO add file name
          link.setAttribute('download', 'file.pdf');
          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
        });
    }, 'image/png');
  };

  const handleImport = () => {
    document.getElementById('fileupload').click();
  };
  return (
    <VStack width={'100%'}>
      <HStack width={'100%'} pt={4}>
        <FormControl width={'50%'}>
          <FormLabel fontSize={'xs'}>Template size</FormLabel>
          <Select
            boxShadow={'lg'}
            size={'sm'}
            onChange={props.onChange}
            value={props.selectedTemplate}
            bg={'white'}
          >
            <option value={'1'}>70mm x 31.5 (3x7)</option>
            <option value={'2'}>105mm x 74.25mm (2x4)</option>
          </Select>
        </FormControl>
        <ButtonGroup
          pt={7}
          pr={7}
          width={'50%'}
          colorScheme={'blue'}
          size={'sm'}
          isAttached
          variant={'outline'}
        >
          <Button boxShadow={'lg'} width={'50%'} onClick={props.createCanvas}>
            Create
          </Button>

          <Button boxShadow={'lg'} width={'50%'} onClick={handleImport}>
            Import JSON
          </Button>
        </ButtonGroup>
      </HStack>
      <HStack width={'100%'} pt={2}>
        <FormControl width={'50%'}>
          <FormLabel fontSize={'xs'}>Number of pages</FormLabel>
          <NumberInput
            boxShadow={'lg'}
            bg={'white'}
            size={'sm'}
            onChange={setSelectedPageNumber}
            value={selectedPageNumber}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <ButtonGroup
          width={'50%'}
          colorScheme={'blue'}
          size={'sm'}
          isAttached
          variant={'outline'}
          pt={7}
          pr={7}
        >
          <Button boxShadow={'lg'} width={'50%'} onClick={create}>
            Save PDF
          </Button>
          <Button boxShadow={'lg'} width={'50%'} onClick={props.exportJson}>
            Export JSON
          </Button>
        </ButtonGroup>
      </HStack>
    </VStack>
  );
};

export default SelectMenu;
