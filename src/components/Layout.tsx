import { Container, HStack, VStack } from '@chakra-ui/react'
import { Outlet, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

export const Layout = () => {
  return (
    <VStack h="100vh" w="full" gap={0}>
      <HStack p={4} gap={4} w="full" bg="gray.700">
        <ChakraLink as={ReactRouterLink} to="/">
          Database
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/favorites">
          Favorites
        </ChakraLink>
      </HStack>
      <Container py={4} maxW="container.md">
        <Outlet />
      </Container>
    </VStack>
  )
}
