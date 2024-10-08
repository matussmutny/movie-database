import { ArrowBackIcon, ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons'
import {
  HStack,
  IconButton,
  Input,
  VStack,
  Text,
  Heading,
  Spinner,
} from '@chakra-ui/react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useStore } from '../../store'
import { MovieItem, ToggleFavoriteButton } from '../common'
import { PAGE_SIZE } from '../../constants'

const SearchInput = () => {
  const search = useStore(state => state.search)
  const inputValue = useStore(state => state.inputValue)
  const setSearch = useStore(state => state.setSearch)
  const setInputValue = useStore(state => state.setInputValue)
  const resetPage = useStore(state => state.resetPage)

  return (
    <HStack w="full">
      <Input
        placeholder="Search Movie Title"
        value={inputValue}
        onChange={event => {
          setInputValue(event.target.value)
        }}
      />
      <IconButton
        isDisabled={!inputValue}
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
  )
}

interface PaginationProps {
  totalResults: number
}

const Pagination = ({ totalResults }: PaginationProps) => {
  const page = useStore(state => state.page)
  const incPage = useStore(state => state.incPage)
  const decPage = useStore(state => state.decPage)

  if (totalResults > PAGE_SIZE) {
    return (
      <HStack w="full" justifyContent="end">
        <Text>{`${Math.min(page * PAGE_SIZE, totalResults)}/${totalResults}`}</Text>
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
            isDisabled={totalResults - page * PAGE_SIZE <= 0}
            onClick={incPage}
          />
        </HStack>
      </HStack>
    )
  }

  return null
}

type Movie = {
  Title: string
  Year: string
  imdbID: string
  Poster: string
}

type SearchResult =
  | {
      Search: Array<Movie>
      totalResults: string
      Response: 'True'
    }
  | {
      Error: string
      Response: 'False'
    }

export const Database = () => {
  const search = useStore(state => state.search)
  const page = useStore(state => state.page)
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
      <SearchInput />
      {isLoading && <Spinner />}
      {data &&
        (data.Response === 'True' ? (
          <VStack w="full" gap={4}>
            <Pagination totalResults={Number(data.totalResults)} />
            {data.Search?.map(movie => (
              <MovieItem
                movie={movie}
                justifyContent="start"
                alignItems="start"
              >
                <ToggleFavoriteButton movie={movie} size="sm" />
              </MovieItem>
            ))}
          </VStack>
        ) : (
          <Text>No movie found :(</Text>
        ))}
    </VStack>
  )
}
