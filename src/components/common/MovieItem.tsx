import {
  HStack,
  VStack,
  Image,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Movie } from '../../types'
import { ReactNode } from 'react'
import { Route } from '../../constants'

interface MovieItemProps {
  movie: Movie
  rightElement?: ReactNode
}

export const MovieItem = ({ movie, rightElement }: MovieItemProps) => {
  return (
    <HStack
      w="full"
      alignItems="start"
      justifyContent="space-between"
      p={2}
      border="1px solid"
      borderColor="gray.400"
      borderRadius="md"
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
      {rightElement}
    </HStack>
  )
}
