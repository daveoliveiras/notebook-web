import { Navigate, Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { SearchProvider } from '@/contexts/SearchContext'
import Cookies from 'universal-cookie'

export function Default(){

  const cookies = new Cookies()
  const token = cookies.get('token', {doNotParse: true})
  let hasToken: boolean
  if(token == undefined) hasToken = false; else hasToken = true

  return(
    <main className='flex h-screen flex-col'>
      {hasToken ? <> 
        <SearchProvider> 
          <Header/>
          <Outlet/> 
        </SearchProvider>
        <Footer/> 
        </>: <Navigate to='/login'/>}    
    </main>      
  )
}