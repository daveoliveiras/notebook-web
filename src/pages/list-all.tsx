import { Notebook } from '@/lib/notebook'
import { ax } from '../lib/axios'
import '../main.css'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { context } from '@/lib/context'
import notefoto from '../assets/my.jpg'
import gif from '../assets/loading.gif'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function ListAll(){
  const [notebooks, setNotebooks] = useState([])

  console.log('hi')

  document.title = 'Dashboard'

  console.log(useContext(context))

  useEffect(() => {
    ax.get('/notebook').then((response) => {
      console.log(response.data)
      setNotebooks(response.data)
    })
  },[])

  const search = useContext(context)

  notebooks.map((note: Notebook) => {
    if(note.brand.name.indexOf(search[1]) != -1){
      console.log(note.id)
    }
  })

  if(notebooks.length == 0){
    return<div className='flex-grow flex justify-center items-center'>
      <img src={gif} className='h-20 w-20'></img>
    </div>
  }
  else 
  {
    return<>    
    
    {/* <div className='flex flex-grow flex-wrap p-5 mb-20 justify-center gap-y-10 gap-x-20'> */}
    <div className='grid flex-grow grid-cols-1 sm:grid-cols-4 pl-16 pr-16 pt-5 mb-20 gap-y-10 gap-x-20 justify-items-center'>
      {notebooks.map((note: Notebook) => 

        <div key={note.id} className='flex shadow flex-row justify-center items-center gap-7 rounded text-zinc-800 bg-zinc-300 w-64 h-40'>
          
          <img src={notefoto} className='h-28 w-20 rounded'></img>
          
          <div className='flex flex-col text-sm font-roboto'>
            <span >Código: {note.id}</span>
            <span>{note.brand.name}</span>
            <span>{note.system.name} {note.system.version}</span>
            <span className='mb-2'>RAM {note.ram} GB</span>
            
              <div className='bg-zinc-400/70 pt-px pb-px pl-1 pr-1 rounded'>
                <Dialog>
                  <DialogTrigger>Mais detalhes</DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle><Link to={`edit/${note.id}`}>Notebook</Link></DialogTitle>
                      {note.ssd}
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            
          </div>
        </div>          

      )}

      <Link to='/new'>
        <div className='bg-zinc-200 rounded w-64 h-40 flex items-center justify-center pb-4 text-gray-400 text-7xl'>
          <span>+</span>
        </div>
      </Link>
    </div>    
    </>
  }  
}