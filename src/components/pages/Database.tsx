import { ArrowBackIcon, ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons'
import {
  HStack,
  IconButton,
  Input,
  VStack,
  Text,
  Heading,
} from '@chakra-ui/react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useStore } from '../../store'
import { MovieItem } from '../common'
import { PAGE_SIZE } from '../../constants'

type Movie = {
  Title: string
  Year: string
  imdbID: string
  Poster: string
}

type SearchResult = {
  Search?: Array<Movie>
  totalResults?: string
  Error?: string
}

export const Database = () => {
  const search = useStore(state => state.search)
  const inputValue = useStore(state => state.inputValue)
  const page = useStore(state => state.page)
  const setSearch = useStore(state => state.setSearch)
  const setInputValue = useStore(state => state.setInputValue)
  const incPage = useStore(state => state.incPage)
  const decPage = useStore(state => state.decPage)
  const resetPage = useStore(state => state.resetPage)
  const { isLoading, data } = useQuery<SearchResult>({
    queryKey: ['searchData', search, page],
    enabled: !!search,
    placeholderData: keepPreviousData,
    queryFn: () =>
      fetch(
        `http://omdbapi.com/?apikey=d3d77444&s=${search}&type=movie&page=${page}`,
      ).then(res => res.json()),
  })

  return (
    <VStack gap={4}>
      <Heading>Movie Search</Heading>
      <HStack w="full">
        <Input
          placeholder="Search Movie Title"
          value={inputValue}
          onChange={event => {
            setInputValue(event.target.value)
          }}
        />
        <IconButton
          isDisabled={isLoading || !inputValue}
          aria-label="Search database"
          icon={<SearchIcon />}
          onClick={() => {
            if (search !== inputValue) {
              resetPage()
              setSearch(inputValue)
            }
          }}
        />
      </HStack>
      {data && (
        <VStack w="full" gap={4}>
          {Number(data.totalResults) > PAGE_SIZE && (
            <HStack w="full" justifyContent="end">
              <Text>{`${Math.min(page * PAGE_SIZE, Number(data.totalResults))}/${data.totalResults}`}</Text>
              <HStack>
                <IconButton
                  icon={<ArrowBackIcon />}
                  aria-label="go to previous page"
                  isDisabled={page === 1}
                  onClick={decPage}
                />
                <IconButton
                  icon={<ArrowForwardIcon />}
                  aria-label="go to next page"
                  isDisabled={Number(data.totalResults) - page * PAGE_SIZE <= 0}
                  onClick={incPage}
                />
              </HStack>
            </HStack>
          )}
          {data.Search?.map(movie => <MovieItem movie={movie} />)}
        </VStack>
      )}
    </VStack>
  )
}
