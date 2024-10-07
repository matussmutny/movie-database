import { Container, Heading, HStack, VStack } from '@chakra-ui/react'
import { Outlet, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

export const Layout = () => {
  return (
    <VStack h="100vh" w="full" gap={0}>
      <HStack
        p={4}
        gap={4}
        w="full"
        bg="gray.700"
        justifyContent="space-between"
      >
        <Heading fontSize="2xl">Movie Database</Heading>
        <HStack>
          <ChakraLink as={ReactRouterLink} to="/">
            Search
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/favorites">
            Favorites
          </ChakraLink>
        </HStack>
      </HStack>
      <Container py={4} maxW="container.md">
        <Outlet />
      </Container>
    </VStack>
  )
}
