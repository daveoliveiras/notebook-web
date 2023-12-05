import { Dispatch, SetStateAction, createContext, useState } from 'react'

type props= {
  children: React.ReactNode
}

const modelObject = {
  search: ['Filtros', ''],
  setSearch: function setSearch(filter: string, value: string){}
}

export const SearchContext = createContext(modelObject)

export const SearchProvider = ({children}: props) => {
  const [search, setSearch] = useState(['Filtro', '']) 

  function changeState(filter: string, value: string){
    setSearch([filter, value])
  }

  const myObject = {
    search: search,
    setSearch: changeState
  }

  return<>
    <SearchContext.Provider value={myObject}>
      {children}
    </SearchContext.Provider>
  </>
}