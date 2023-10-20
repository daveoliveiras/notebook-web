import { Notebook } from '@/types/notebook'
import { Link } from 'react-router-dom'
import { MouseEvent } from 'react'
import bookPng from '../assets/notebook.png'
import os from '../assets/os.png'
import ram from '../assets/ram.png'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'

type cardProps = {
  note: Notebook,
}

export function Card(props: cardProps){

  const [selectedImage, setSelectedImage] = useState(0)

  function nextImage(event: MouseEvent<HTMLInputElement>){
    if(props.note.photos.length <= selectedImage + 1)
      setSelectedImage(0)
    else
      setSelectedImage(selectedImage + 1)
  }

  return<div key={props.note.id} 
    className='flex shadow flex-row justify-center items-center gap-7 rounded text-zinc-800 bg-zinc-300 w-64 h-40'>
          
    <img src={'https://notebooks-fastify.s3.us-east-2.amazonaws.com/' + props.note.photos[0].path} className='h-28 w-20 rounded'></img>
    
    <div className='flex flex-col text-sm font-roboto'>
      <span >Código: {props.note.id}</span>

      <div className='flex items-center justify-center gap-2 ml-1'>
        <img className='h-7 w-7' src={bookPng}></img>
        <span>{props.note.brand.name}</span>
      </div>

      <div className='flex items-center justify-center gap-2 ml-1'>
        <img className='h-7 w-7' src={os}></img>
        <span>{props.note.system.name} {props.note.system.version}</span>
      </div>

      <div className='flex items-center gap-1'>
        <img className='h-9 w-9' src={ram}></img>
        <span>RAM {props.note.ram} GB</span>
      </div>
      
      <div className='bg-zinc-400/70 pt-px pb-px pl-1 pr-1 rounded'>
        <Dialog>
          <DialogTrigger>Mais detalhes</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle><Link className='text-2xl' to={`edit/${props.note.id}`}>Notebook {props.note.id}</Link></DialogTitle>

              <div className='flex'>
                <div>              
                  <div> <span className='font-bold'>Marca:</span> {props.note.brand.name} </div>
                  <div> <span className='font-bold'>Modelo:</span> {props.note.model} </div>
                  <div> <span className='font-bold'>Sistema:</span> {props.note.system.name} {props.note.system.version} </div>
                  <div> 
                    <span className='font-bold'>Processador: </span> 
                    {props.note.processor_brand} {props.note.processor_model} {props.note.clock} 
                  </div>
                  {props.note.hd ? <div> <span className='font-bold'>HDD:</span> {props.note.hd} GB</div> : null}
                  {props.note.ssd ? <div> <span className='font-bold'>SSD:</span> {props.note.ssd} GB</div> : null}
                  <div> <span className='font-bold'>RAM:</span> {props.note.ram} GB DDR {props.note.ddr} </div>
                  <div> <span className='font-bold'>Resolução:</span> {props.note.resolution} </div>
                  <div> <span className='font-bold'>Nota:</span> {props.note.note} </div>
                </div>

                <div>
                  <img className='w-60' src={'https://notebooks-fastify.s3.us-east-2.amazonaws.com/' + props.note.photos[selectedImage].path}></img>
                  <input type='button' value='ee' onClick={nextImage}/>
                </div>
              </div>
              
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>  

    </div>
</div> 
}