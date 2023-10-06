import { Notebook } from '@/lib/notebook'
import { ax } from '../lib/axios'
import '../main.css'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { context } from '@/lib/context'
import gif from '../assets/loading.gif'
import os from '../assets/os.png'
import ram from '../assets/ram.png'
import notebook from '../assets/notebook.png'

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
          
          <img src={'https://notebooks-fastify.s3.us-east-2.amazonaws.com/' + note.photos[0].path} className='h-28 w-20 rounded'></img>
          
          <div className='flex flex-col text-sm font-roboto'>
            <span >Código: {note.id}</span>

            <div className='flex items-center justify-center gap-2 ml-1'>
              <img className='h-7 w-7' src={notebook}></img>
              <span>{note.brand.name}</span>
            </div>

            <div className='flex items-center justify-center gap-2 ml-1'>
              <img className='h-7 w-7' src={os}></img>
              <span>{note.system.name} {note.system.version}</span>
            </div>

            <div className='flex items-center gap-1'>
              <img className='h-9 w-9' src={ram}></img>
              <span>RAM {note.ram} GB</span>
            </div>
            
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