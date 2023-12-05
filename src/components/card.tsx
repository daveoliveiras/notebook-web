import { MouseEvent, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Notebook } from '@/types/notebook'
import { DeleteModal } from './DeleteModal'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type cardProps = {
  note: Notebook,
}

export function Card(props: cardProps){

  const [selectedImage, setSelectedImage] = useState(0)

  function nextImage(event: MouseEvent<HTMLButtonElement>){
    if(props.note.photos.length <= selectedImage + 1)
      setSelectedImage(0)
    else
      setSelectedImage(selectedImage + 1)
  }

  function backImage(event: MouseEvent<HTMLButtonElement>){
    if(props.note.photos.length > selectedImage + 1)
      setSelectedImage(props.note.photos.length - 1)
    else
      setSelectedImage(selectedImage - 1)
  }

  return<div
    className='flex shadow flex-row justify-center items-center gap-7 rounded text-zinc-800 bg-zinc-300 w-64 h-40'>

    <div className='flex flex-col text-sm font-roboto gap-1'>
      <span className='font-bold'>Código {props.note.id}</span>
      <span>{props.note.brand.name}</span>
      <span>{props.note.model}</span>
      <span>{props.note.system.name} {props.note.system_version}</span>
      
      <div className='bg-zinc-400/70 rounded flex justify-center'>
        <Dialog>
          <DialogTrigger>Mais detalhes</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='mb-5'>Notebook {props.note.id}</DialogTitle>

              <div className='flex justify-between'>
                <div className='flex flex-col gap-2'>              
                  <div className='flex flex-col'> 
                    <span className='font-bold'>Marca</span> {props.note.brand.name} 
                  </div>
                  <div className='flex flex-col'>
                    <span className='font-bold'>Modelo</span> {props.note.model} 
                  </div>
                  <div className='flex flex-col'> 
                    <span className='font-bold'>Sistema</span> {props.note.system.name} {props.note.system_version} 
                  </div>
                  <div className='flex flex-col'> 
                    <span className='font-bold'>Processador</span> 
                    {props.note.processor_brand} {props.note.processor_model} {props.note.clock} 
                  </div>

                  {props.note.hd ? 
                    <div className='flex flex-col'>
                      <span className='font-bold'>HDD</span> {props.note.hd} GB
                    </div> 
                  : null}

                  {props.note.ssd ?
                    <div className='flex flex-col'> 
                      <span className='font-bold'>SSD</span> {props.note.ssd} GB</div> 
                  : null}

                  <div className='flex flex-col'> 
                    <span className='font-bold'>RAM</span> {props.note.ram} GB DDR {props.note.ddr} 
                  </div>

                  <div className='flex flex-col'> 
                    <span className='font-bold'>Resolução</span> {props.note.resolution} 
                  </div>

                </div>

                <div className='flex flex-col items-center'>
                  <img className='w-60 rounded-sm' src={'https://notebooks-fastify.s3.us-east-2.amazonaws.com/' + props.note.photos[selectedImage].path}></img>
                  <div className='flex gap-5 mt-4'>
                    <Button className='w-12' variant='outline' onClick={backImage}>
                      <ChevronLeft className='w-10'/>
                    </Button>
                    
                    <Button className='w-12' variant='outline' onClick={nextImage}>
                      <ChevronRight className='w-10'/>
                    </Button>
                  </div>
                  <div className='flex flex-col'> 
                    <textarea readOnly className='resize-none outline-none border rounded-sm mt-5 w-60 h-32' value={props.note.note}></textarea>
                  </div>
                </div>
              </div>

              <div className='flex justify-center gap-5'>
                <Link to={`edit/${props.note.id}`}>
                  <Button variant='secondary'>Editar</Button>
                </Link>

                <Button variant='secondary'>
                  <DeleteModal id={props.note.id}/>
                </Button>
                  
                <Button variant='secondary'>
                  Baixar PDF
                </Button>
              </div>
              
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>  
    </div>

    <div className='flex flex-col text-sm items-center'>
      <img src={'https://notebooks-fastify.s3.us-east-2.amazonaws.com/' + props.note.photos[0].path} className=' w-20 rounded'></img>
    </div>
</div> 
}