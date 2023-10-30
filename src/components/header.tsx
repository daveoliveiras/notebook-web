import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useState, useContext, ChangeEvent, MouseEvent, MouseEventHandler } from 'react'
import HomePng from '../assets/home.png'
import PlusPng from '../assets/plus.png'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, 
  DropdownMenuTrigger } from './ui/dropdown-menu'
import LeavePng from '../assets/leave.png'
import { ArrowsDownUp } from 'phosphor-react'
import Cookies from 'universal-cookie'
import decode from 'jwt-decode'

type User = {
  name: string,
  photo: string
}

export function Header(){

  const [filter, setFilter] = useState('Filtros')

  const url = useNavigate()

  const cookie = new Cookies()
  const token = cookie.get('token')
  const user: User = decode(token)

  function handleFilterSearch(event: ChangeEvent<HTMLInputElement>){
  }

  function handleLogout(event: MouseEvent<HTMLInputElement>){
    cookie.remove('token')
    url('/login')
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
      <img src={user.photo} className='h-6 w-6 mt-1 mr-1 rounded-full'/>
      <span className='mr-8'>{user.name}</span>
      <img src={LeavePng} className='h-4 w-4 mt-1 mr-1'/>
      <input type='button' value={'sair'} onClick={handleLogout} className='cursor-pointer'/>
    </div>
  </header>
}