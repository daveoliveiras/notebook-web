import { createContext } from 'react'

let photos = createContext(['init'])

function changePhotos(content: string[]){
  photos = createContext(content)
}

export {photos, changePhotos}