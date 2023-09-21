import { Notebook } from '@/lib/notebook'
import { ax } from '../lib/axios'
import '../main.css'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export function ListAll(){
  document.title = 'Dashboard'

  const [notebooks, setNotebooks] = useState([])

  useEffect(() => {
    ax.get('/notebook').then((response) => {
      console.log(response.data)
      setNotebooks(response.data)
    })
  },[])

  if(notebooks.length == 0){
    return<>loading</>
  }
  else
  {
    return<>    
    
    <div className='flex flex-wrap flex-grow gap-4'>
      {notebooks.map((note: Notebook) => 
        <div key={note.id} className='bg-zinc-400 w-28 h-28 basis-52'>
          {note.id}<br/>{note.brand.name}
          <Link to={`edit/${note.id}`}>edit</Link>
        </div>
      )}
        <div className='bg-zinc-200 w-28 h-28'>+</div>
    </div>    

    </>
  }  
}