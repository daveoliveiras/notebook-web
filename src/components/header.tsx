import { NavLink } from 'react-router-dom'

export function Header(){
  return<header>
    <NavLink className="transition" to="/">4 Dashboard</NavLink>
    <NavLink className="transition" to="/new">Novo Notebook +</NavLink>
  </header>
}