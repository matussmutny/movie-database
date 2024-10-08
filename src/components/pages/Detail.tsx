import { HStack, VStack, Image, Text, Spinner } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { Movie } from '../../types'
import { ToggleFavoriteButton } from '../common'

type Params = {
  movieId: string
}

type MovieDetail = {
  Genre: string
  Director: string
  Actors: string
  Plot: string
} & Movie

export const Detail = () => {
  const { movieId } = useParams<Params>()

  const { isLoading, data } = useQuery<MovieDetail>({
    queryKey: ['movieDetail', movieId],
    queryFn: () =>
      fetch(`http://omdbapi.com/?apikey=d3d77444&i=${movieId}&plot=full`).then(
        res => res.json(),
      ),
  })

  if (isLoading) {
    return <Spinner />
  }

  if (data) {
    return (
      <VStack>
        <HStack alignItems="start" gap={4}>
          <Image w={60} h={96} objectFit="cover" src={data.Poster} />
          <VStack alignItems="start" textAlign="start">
            <HStack>
              <Text fontSize="3xl">{data.Title}</Text>
              <ToggleFavoriteButton movie={data} />
            </HStack>
            <HStack>
              <Text color="gray.400">{`(${data.Year})`}</Text>
              <Text color="gray.400">{data.Genre}</Text>
            </HStack>
            <Text color="gray.400">{`Director: ${data.Director}`}</Text>
            <Text color="gray.400">{`Actors: ${data.Actors}`}</Text>
            <Text color="gray.200">{data.Plot}</Text>
          </VStack>
        </HStack>
      </VStack>
    )
  }

  return <div>error</div>
}
