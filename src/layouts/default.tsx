import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/header'


export function Default(){
  return<>
    <main className=''>
        <Header/>
        <Outlet/>
        <div className=''>
          <Footer/>
        </div>
    </main>
      
  </>
}