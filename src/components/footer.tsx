import GitHub from '../assets/github.png'

export function Footer(){

  return(
    <footer className='flex items-center justify-center min-h-20 border-t-2 bg-zinc-100 border-t-zinc-200'>

      <p className='font-roboto text-sm text-zinc-700'>
        Desenvolvido por <a href='/' className='text-black transition hover:text-zinc-600'>Davi Oliveira</a>
      </p>

      <div className='w-px h-9 mr-2 ml-2 bg-zinc-400'/>

      <a href='https://github.com/daveoliveiras/notebook-web' target='blank' 
      className='flex items-center pr-3 pl-3 h-8 rounded-sm transition hover:bg-gray-500/40 bg-zinc-300'>
        <img src={GitHub} className='h-5'/>
        <p className='font-roboto text-sm pl-2 text-zinc-900'>GitHub</p>        
      </a>

    </footer>
  )
}