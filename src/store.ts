import { create } from 'zustand'

type Store = {
  search: string
  inputValue: string
  page: number
  setSearch: (search: string) => void
  setInputValue: (inputValue: string) => void
  incPage: () => void
  decPage: () => void
  resetPage: () => void
}

export const useStore = create<Store>(set => ({
  search: '',
  inputValue: '',
  page: 1,
  setSearch: search => set(state => ({ ...state, search })),
  setInputValue: inputValue => set(state => ({ ...state, inputValue })),
  incPage: () => set(state => ({ ...state, page: state.page + 1 })),
  decPage: () => set(state => ({ ...state, page: state.page - 1 })),
  resetPage: () => set({ page: 1 }),
}))
