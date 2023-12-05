import { Dashboard } from '@/pages/dashboard'
import { LoginPage } from '@/pages/login'
import { Navigate, Route, Routes } from 'react-router-dom'
import Cookies from 'universal-cookie'

export function CookieVerification(){
  const cookies = new Cookies()
  const token = cookies.get('token')

  function Check(){
    if(token)
      return true
    else
      return false
  }

  if(Check())
    console.log('achei o biscoito')
  else
    console.log('nao achei')
  
  return(
    <>
      {Check() ? <Navigate to='/'/>  : <LoginPage/>}
    </>
  )
}