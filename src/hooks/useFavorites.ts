import { useLocalStorage } from 'usehooks-ts'
import { Movie } from '../types'
import { omit } from 'lodash'

const FAVORITES_LS_KEY = 'favorites'

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage<Record<string, Movie>>(
    FAVORITES_LS_KEY,
    {},
  )

  const addToFavorites = (movie: Movie) => {
    setFavorites({ ...favorites, [movie.imdbID]: movie })
  }

  const removeFromFavorites = (movieId: string) => {
    setFavorites(omit(favorites, movieId))
  }

  return { favorites, addToFavorites, removeFromFavorites }
}
