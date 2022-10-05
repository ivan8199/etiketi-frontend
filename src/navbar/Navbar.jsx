import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
} from '@chakra-ui/react';
import * as React from 'react';

import { Logo } from '../Logo';

export const Navbar = () => {
  return (
    <Box as="section">
      <Box as="nav" bg="bg-surface" boxShadow={'md'}>
        <Container maxW={'1280px'} py={'5'}>
          <HStack spacing="10" justify="space-between">
            <Logo />
            <Flex justify="space-between" flex="1">
              <ButtonGroup variant="link" spacing="8">
                {['Home', 'Labels', 'Barcodes'].map(item => (
                  <Button key={item}>{item}</Button>
                ))}
              </ButtonGroup>
              <HStack spacing="3"></HStack>
            </Flex>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};
