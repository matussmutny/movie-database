import {
  HStack,
  VStack,
  Image,
  Text,
  Link as ChakraLink,
  StackProps,
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Movie } from '../../types'
import { PropsWithChildren } from 'react'
import { Route } from '../../constants'

interface MovieItemProps extends StackProps, PropsWithChildren {
  movie: Movie
}

export const MovieItem = ({ movie, children, ...props }: MovieItemProps) => {
  return (
    <HStack
      w="full"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      border="1px solid"
      borderColor="gray.400"
      borderRadius="md"
      {...props}
    >
      <HStack>
        <Image
          w={12}
          h={14}
          objectFit="cover"
          src={movie.Poster}
          alt={`${movie.Title} Poster`}
        />
        <VStack gap={0} alignItems="start">
          <ChakraLink
            as={ReactRouterLink}
            to={`../${Route.Detail}/${movie.imdbID}`}
          >
            <Text fontSize="xl" noOfLines={1}>
              {movie.Title}
            </Text>
          </ChakraLink>
          <Text color="gray.400">{`(${movie.Year})`}</Text>
        </VStack>
      </HStack>
      {children}
    </HStack>
  )
}
