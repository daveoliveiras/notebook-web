import { createContext } from 'react'

const a: File[] = []
let foto = createContext(a)

function changeFotos(content: File[]){
  foto = createContext(content)
}

export {foto, changeFotos}