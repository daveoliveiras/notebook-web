import { NavLink, useLocation } from 'react-router-dom'
import { useState, useContext, createContext, ChangeEvent } from 'react'
import HomePng from '../assets/home-2502.png'
import PlusPng from '../assets/plus2.png'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, 
  DropdownMenuTrigger } from './ui/dropdown-menu'
import UserPng from '../assets/user.png'
import LeavePng from '../assets/leave.png'
import { ArrowsDownUp } from 'phosphor-react'
import { context, changeContext } from '@/lib/context'


export function Header(){

  const [filter, setFilter] = useState('Filtros')
  const [Search, setSearch] = useState('')

  const a = useContext(context)

  function handleFilterSearch(event: ChangeEvent<HTMLInputElement>){
    changeContext([filter, event.target.value])
    setSearch(a[1])
    console.log(a)
  }

  return<header className='flex pl-8 pr-8 items-center bg-zinc-100 min-h-16 h-16'>
    <nav className="flex flex-auto gap-3 font-roboto text-sm text-zinc-800">
      <NavLink className="transition bg-zinc-300 pt-1 pb-1 pl-2 pr-2 gap-1 flex items-center rounded-md" to="/">
        <img src={HomePng} className='h-4 w-4 mb-0.5'/>
        <span className='hidden md:block'>Dashboard</span>
      </NavLink>

      <NavLink className="transition bg-zinc-300 pt-1 pb-1 pl-2 pr-2 gap-1 flex items-center rounded-md" to="/new">
        <img src={PlusPng} className='h-4 w-4'/>
        <span className='hidden md:block'>Novo Notebook</span>
      </NavLink>
    </nav>

    <div className={`flex-auto ${useLocation().pathname.indexOf('edit') == -1 ? '' : 'hidden'} flex gap-1 justify-center`}>
      <input onChange={handleFilterSearch} disabled={filter == 'Filtros' ? true : false } 
      className='placeholder:italic border rounded-sm outline-none h-8 pl-2' 
      type='text' 
      placeholder='Search...'/>

      <DropdownMenu>
        <DropdownMenuTrigger className='w-28 pl-3 pr-3 items-center font-roboto text-sm justify-between flex rounded-sm bg-zinc-200 hover:bg-zinc-200/20 outline-none border'>
          {filter}
          <ArrowsDownUp size={15} className='mt-px'/>
        </DropdownMenuTrigger>

          <DropdownMenuContent className='bg-zinc-500 text-white border border-zinc-600'>
            <DropdownMenuLabel>Filtros</DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-zinc-600'/>
            <DropdownMenuItem onClick={() => { setFilter('Marcas') }}>Marcas</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setFilter('Modelos') }}>Modelos</DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div className='flex flex-auto content-end justify-end'>
      <img src={UserPng} className='h-4 w-4 mt-1 mr-1'/>
      <span className='mr-8'>Davi</span>
      <img src={LeavePng} className='h-4 w-4 mt-1 mr-1'/>
      <span>Sair</span>
    </div>
  </header>
}