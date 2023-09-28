import { Outlet } from 'react-router-dom'
import { Footer } from '../components/footer'
import { Header } from '../components/header'

export function Default(){
  return<>
    <main className='flex h-screen flex-col'>
      <Header/>
      <Outlet/>
      <Footer/>
    </main>      
  </>
}