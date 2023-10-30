import { MouseEvent, useState } from 'react'
import { api } from '@/lib/axios'
import { Button } from './ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { Loader2 } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type props = {
  id: number
}

export function DeleteModal(props: props){

  const [deleting, setDeleting] = useState(false)

  async function handleConfirm(event: MouseEvent<HTMLButtonElement>){
    setDeleting(true)
    await api.delete('/notebook/' + props.id)
    window.location.reload()
  }

  return<>
    <Dialog>
      <DialogTrigger>Deletar</DialogTrigger>
      <DialogContent className='w-10'>
        <DialogHeader>
          <DialogTitle>Tem certeza? Esse notebook será apagado</DialogTitle>
        </DialogHeader>
        <div className='flex justify-center gap-20 mt-5'>
          {deleting ? 
            <Button disabled variant='destructive'><Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2> Deletando</Button>
          : <Button variant='destructive' onClick={handleConfirm} className='w-20'>Deletar</Button>}
          <DialogClose>
            <Button>Voltar</Button>
          </DialogClose>       
        </div>
      </DialogContent>
    </Dialog> 
  </>
}