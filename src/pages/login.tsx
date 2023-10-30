import { auth, provider, signInWithPopup } from '../firebase/config'
import { MouseEvent, useState } from 'react'
import { GoogleAuthProvider } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { api } from '@/lib/axios'
import Cookies from 'universal-cookie'
import google from '../assets/google.png'
import mail from '../assets/mail.png'
import '../style.css'
import { Loader2 } from 'lucide-react'

export function LoginPage(){

  const [accessing, setAccessing] = useState(false)

  const url = useNavigate() 

  function handleClick(event: MouseEvent<HTMLAnchorElement>){
    setAccessing(true)
    signInWithPopup(auth, provider).then((data) => {
      const credential = GoogleAuthProvider.credentialFromResult(data)
      console.log(credential)
      event.preventDefault()
      
      api.post('/auth', data).then((response) => {
        const cookies = new Cookies()
        const secs = 60 * 60 * 24 * 30
        cookies.set('token', response.data, {path: '/', maxAge: secs})
        api.defaults.headers.common = {'Authorization': `bearer ${cookies.get('token')}`}
        url('/')
      })

    }).catch((e) => {
      console.log(e)
    })

  }

  return<div>
    <div className='flex flex-col items-center gap-10 h-screen'>

      <p className='font-roboto text-2xl mb-4 mt-10'>Iniciar sessão ou registrar-se</p>

      <div className='flex flex-col'>
      <label>E-mail</label>
      <input className='field w-60' type='text' placeholder="joao@email.com"/>
      </div>

      <div className='flex flex-col'>
      <label>Senha</label>
      <input className='field w-60' type='password' placeholder="******"/>
      </div>
      
      <div className='flex flex-col items-center gap-5'>

      <a className='cursor-not-allowed bg-gray-300 p-2 rounded-sm w-60'>
        <div className='flex items-center gap-3 font-roboto text-gray-500'>
          <img src={mail} className='h-6 ml-1 '></img>
          Acessar e-mail e senha
        </div>
      </a>

      <div className='flex flex-col items-center justify-center'>
      <div className='h-px w-64 bg-zinc-300'></div>
      <span className='text-zinc-400 italic mt-1'>Atualmente só é possível entrar com o Google</span>
      </div>

      <a className='cursor-pointer bg-gray-200 p-2 rounded-sm w-60' onClick={handleClick}>
        <div className='flex items-center gap-3 font-roboto'>
          {accessing ? <Loader2 className='w-4 h-4 animate-spin'></Loader2> : <img src={google} className='w-4 h-4 m-1'></img>}
          Acessar com o google
        </div>
      </a>

      </div>

      <span className='italic mt-8 mr-3 ml-5 max-w-lg text-justify'>Esse site usa cookies para armazenar seus dados de login. Ao continuar, você corcorda com isso.</span>

    </div>
  </div>
}