import { ButtonProps, IconButton } from '@chakra-ui/react'
import { useFavorites } from '../../hooks'
import { Movie } from '../../types'
import { StarIcon } from '@chakra-ui/icons'

interface ToggleFavoriteButtonProps extends ButtonProps {
  movie: Movie
}

export const ToggleFavoriteButton = ({
  movie,
  ...props
}: ToggleFavoriteButtonProps) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites()
  const isFavorite = favorites[movie.imdbID]

  return (
    <IconButton
      size="md"
      background="transparent"
      _hover={{
        background: 'transparent',
        color: isFavorite ? 'white' : 'gray.400',
      }}
      color={isFavorite ? 'white' : 'gray.700'}
      aria-label="remove from favorites"
      icon={<StarIcon />}
      onClick={() => {
        if (isFavorite) {
          removeFromFavorites(movie.imdbID)
        } else {
          addToFavorites(movie)
        }
      }}
      {...props}
    />
  )
}
