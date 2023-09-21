import { Outlet } from 'react-router-dom'
import { Footer } from '../components/footer'
import { Header } from '../components/header'

export function Default(){
  return<>
    <Header/>
    <main className='min-h-screen'>
      <Outlet/>
    </main>
    <Footer/>
      
  </>
}