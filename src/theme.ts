import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        bg: 'gray.900',
        height: '100vh',
        color: 'white',
      },
      a: {
        color: 'white',
      },
    },
  },
})
