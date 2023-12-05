import { NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import decode from 'jwt-decode'
import Leave from '../assets/leave.png'
import Home from '../assets/home.png'
import Plus from '../assets/plus.png'

// import HomePng from '../assets/home.png'
// import PlusPng from '../assets/plus.png'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, 
//   DropdownMenuTrigger } from './ui/dropdown-menu'
// import { SearchContext } from '@/contexts/SearchContext'
// import { ArrowsDownUp } from 'phosphor-react'

type User = {
  name: string,
  photo: string
}

export function Header(){

  const url = useNavigate()

  const cookie = new Cookies()
  const token = cookie.get('token')
  const user: User = decode(token)

  function handleLogout(){
    cookie.remove('token')
    url('/login')
  }

  // const [filter, setFilter] = useState('Filtros')

  // const searchInput = useRef<HTMLInputElement>(null)

  //const { search, setSearch } = useContext(SearchContext)

  // function handleFilterSearch(event: MouseEvent<HTMLInputElement>){
  //   searchInput.current?.value ? setSearch(filter, searchInput.current?.value) : null 
  //   console.log(search)
  // }

  return(
    <header className='flex items-center justify-between pl-8 pr-8 min-h-16 bg-zinc-100'>
      <nav className="flex gap-3 text-zinc-800">
        <NavLink className="flex items-center justify-center h-7 w-32 max-[599px]:w-8 transition rounded-md bg-zinc-300" to="/">
          <img src={Home} className='w-4 mb-px min-[600px]:hidden'/>
          <span className='font-roboto text-sm block max-[599px]:hidden'>Dashboard</span>
        </NavLink>

        <NavLink className="flex items-center justify-center w-32 max-[599px]:w-8 transition rounded-md bg-zinc-300" to="/new">
          <img src={Plus} className='w-4 mb-px min-[600px]:hidden'/>
          <span className='font-roboto text-sm block max-[599px]:hidden'>Novo Notebook</span>
        </NavLink>
      </nav>

      {/* CAMPO DE PESQUISA */}

      {/* <div className={`flex-auto ${useLocation().pathname.indexOf('edit') == -1 ? '' : 'hidden'} flex gap-1 justify-center`}>
        <input disabled={filter == 'Filtros' ? true : false } 
        className='placeholder:italic border rounded-sm outline-none h-8 pl-2' 
        type='text' 
        placeholder='Search...'
        onChange={(event) => {
          if(event.target.value == ''){
            setSearch(search[0], '')
          }
        }}
        ref={searchInput}/>

        <input type='button' value='pesquise' onClick={handleFilterSearch}/>

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
      </div> */}

      <div className='flex gap-5'>

        <div className='flex items-center'>
          <img src={user.photo} className='w-8 mt-px mr-1 rounded-full'/>
          <span className='font-roboto text-sm max-[599px]:hidden'>{user.name}</span>
        </div>

        <div className='flex items-center cursor-pointer' onClick={handleLogout}>
          <img src={Leave} className='w-6 mr-1'/>
          <button className='font-roboto text-sm'>Sair</button>
        </div>

      </div>

    </header>
  )
}