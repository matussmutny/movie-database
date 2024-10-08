import { Container, Heading, Text, VStack } from '@chakra-ui/react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const getErrorMessage = (error: unknown): string => {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`
  } else if (error instanceof Error) {
    return error.message
  } else if (typeof error === 'string') {
    return error
  } else {
    console.error(error)
    return 'Unknown error'
  }
}

export const ErrorPage = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <Container maxW="container.md">
      <VStack pt={4} gap={4}>
        <Heading>Oops!</Heading>
        <Text fontSize="xl">Sorry, an error has occurred :(</Text>
        <Text as="i">{getErrorMessage(error)}</Text>
      </VStack>
    </Container>
  )
}
