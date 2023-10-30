import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/Card'
import { Notebook } from '@/types/notebook'
import { changeNotebooks } from '@/contexts/notebooks'
import { api } from '../lib/axios'
import gif from '../assets/loading.gif'

export function Dashboard(){
  document.title = 'Dashboard'
  const [notebooks, setNotebooks] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    api.get('/notebook').then((response) => {
      setNotebooks(response.data)
      changeNotebooks(response.data)
      setStatus('loaded')
    })
  },[])

  if(notebooks.length == 0 && status == 'loaded'){
    return<p>Cadastre um novo notebook</p>
  }

  else if(notebooks.length == 0 && status == 'loading'){
    return<div className='flex-grow flex justify-center items-center'>
      <img src={gif} className='h-20 w-20'></img>
    </div>

  }else{
    return<>        
      <div className='grid flex-grow grid-cols-1 sm:grid-cols-4 pl-16 pr-16 pt-5 mb-20 gap-y-10 gap-x-20 justify-items-center'>

        {notebooks.map((note: Notebook) => 
          <Card key={note.id} note={note}/>
        )}
        
          <div className='bg-zinc-200 rounded w-64 h-40 flex items-center justify-center pb-4 text-gray-400 text-7xl'>
          <Link to='/new'>
            <span>+</span>
          </Link>
          </div>

      </div>    
    </>
  }  
}
