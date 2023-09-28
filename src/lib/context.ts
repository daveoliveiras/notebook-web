import { createContext } from 'react'

let context = createContext(['filter', 'Acer'])

function changeContext(content: Array<string>){
  context = createContext(content)
}

export {context, changeContext}