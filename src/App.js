import {
  Box,
  Button,
  ChakraProvider,
  Code,
  Grid,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  theme,
  VStack,
  Flex,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Navbar } from './Navbar';
import Dashboard from './Dashboard';
import SketchComponent from './SketchComponent';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bg={'gray.50'}>
        <Flex direction={'column'} minH="100vh">
          <Navbar />
          <VStack spacing={8}>
            <Dashboard />
            {/* <Button
              onClick={() => {
                setpadding(10);
              }}
            >
              padd
            </Button>
            <NumberInput
              value={padding}
              onChange={value => {
                setpadding(parseInt(value));
                console.log(value);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput> */}
          </VStack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
