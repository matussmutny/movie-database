import { isEmpty } from 'lodash'
import { VStack, Heading, IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { MovieItem } from '../common'
import { useFavorites } from '../../hooks'

export const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites()

  if (isEmpty(favorites)) {
    return <div>There are no favorites</div>
  }

  return (
    <VStack w="full" gap={4}>
      <Heading>Favorite Movies</Heading>
      {Object.values(favorites).map(movie => (
        <MovieItem
          movie={movie}
          rightElement={
            <IconButton
              aria-label="remove from favorites"
              colorScheme="white"
              icon={<DeleteIcon />}
              onClick={() => {
                removeFromFavorites(movie.imdbID)
              }}
              alignSelf="center"
            />
          }
        />
      ))}
    </VStack>
  )
}
