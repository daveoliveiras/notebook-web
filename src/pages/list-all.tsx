import { ax } from '../lib/axios'
import '../main.css'
import { useEffect, useState } from 'react'

type Notebook = {
  id: number,
  model: string
  brand: {name: string}
}

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
    
    <div className='flex gap-4'>
      {notebooks.map((note: Notebook) => 
        <div key={note.id}>{note.id}</div>
      )}
    </div>    

    </>
  }  
}