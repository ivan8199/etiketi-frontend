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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import SketchComponent from './SketchComponent';

function App() {
  const [padding, setpadding] = useState(0);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bg={'gray.100'}>
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Button
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
            </NumberInput>
            <SketchComponent padding={padding} />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
