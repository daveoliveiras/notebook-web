import { Outlet, useNavigate } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import Cookies from 'universal-cookie'

export function Default(){

  const url = useNavigate()
  const cookies = new Cookies()
  const token = cookies.get('token', {doNotParse: true})
  let hasToken: boolean
  if(token == undefined) hasToken = false; else hasToken = true
  if(!hasToken) {
    url('/login')
  }

  return<>
    <main className='flex h-screen flex-col'>
      <Header/>
      <Outlet/>
      <Footer/>
    </main>      
  </>
}