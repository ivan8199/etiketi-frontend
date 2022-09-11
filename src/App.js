import { Box, ChakraProvider, Flex, theme, VStack } from '@chakra-ui/react';
import React from 'react';
import Dashboard from './dashboard/Dashboard';
import { Navbar } from './navbar/Navbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign={'center'} fontSize={'xl'} bg={'gray.50'}>
        <Flex direction={'column'} minH={'100vh'}>
          <Navbar />
          <VStack spacing={8}>
            <Dashboard />
          </VStack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
