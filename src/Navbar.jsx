import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';

import { Logo } from './Logo';

export const Navbar = () => {
  return (
    <Box as="section">
      <Box as="nav" bg="bg-surface" boxShadow={'md'}>
        <Container maxW={'1280px'} py={'5'}>
          <HStack spacing="10" justify="space-between">
            <Logo />
            <Flex justify="space-between" flex="1">
              <ButtonGroup variant="link" spacing="8">
                {['Home', 'Labels', 'Barcodes', 'Contact'].map(item => (
                  <Button key={item}>{item}</Button>
                ))}
              </ButtonGroup>
              <HStack spacing="3">
                <Button variant="ghost" colorScheme={'blue'}>
                  Sign in
                </Button>
                <Button variant="primary" colorScheme={'blue'}>
                  Sign up
                </Button>
              </HStack>
            </Flex>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};
