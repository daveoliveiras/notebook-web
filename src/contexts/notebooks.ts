import { Notebook } from '@/types/notebook'
import { createContext } from 'react'

const arrayNotebooks: Notebook[] = []
let notebooks = createContext(arrayNotebooks)

function changeNotebooks(content: Notebook[]){
  notebooks = createContext(content)
}

export { notebooks, changeNotebooks }