import '../main.css'
import GitPng from '../assets/github.png'

export function Footer(){

  return<>
    <footer className='flex items-center justify-center border-t-2 h-20 min-h-20 pr-8 pl-8  bg-zinc-100 border-t-zinc-200'>

      <p className='flex-1 font-roboto text-zinc-700 00 text-sm hidden md:block'>Esse site utiliza Cookies 🍪</p>

      <p className='font-roboto text-zinc-700 text-sm'>
        Desenvolvido por <a href='/' className='text-black transition hover:text-zinc-500'>Davi Oliveira</a>
      </p>

      <div className='h-9 w-px mr-2 ml-2 bg-zinc-400'></div>

      <a href='https://github.com/daveoliveiras/notebook-web' target='_blank' 
      className='flex items-center pr-3 pl-3 h-8 bg-zinc-300 rounded-sm transition hover:bg-gray-500/40'>
        <img src={GitPng} className='h-5 w-5'/>
        <p className='font-roboto text-zinc-900 text-sm pl-2'>GitHub</p>        
      </a>

    </footer>
  </>
}