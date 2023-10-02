import { Checkbox } from '@/components/ui/checkbox'
import './new.css'
import { Button } from '@/components/ui/button'

export function NewNotebook(){

  document.title = 'Cadastrar'

  function submit(){

  }

  function uploadPhotos(){

  }

  return<>
    <form onSubmit={submit} className="flex-grow flex justify-center gap-32">

      <div className='flex flex-col mr-1'>

        <span className='text-zinc-300 italic mt-8'>Detalhes gerais</span>
        <div className='h-px w-full bg-zinc-300'></div>

        <label htmlFor='id'>Código</label>
        <input name='id' id='id' type="number" min={1} placeholder="id" className='field'></input>

        <label htmlFor='brand'>Marca</label>
        <input name='brand' id='brand' type="text" placeholder="Dell" className='field'></input>

        <label htmlFor='model'>Modelo</label>
        <input name='model' id='model' type="text" placeholder="Inspiron 15" className='field'></input>

        <label htmlFor='system'>Sistema</label>
        <input name='system' id='system' type="text" placeholder="Windows" className='field'></input>

        <span className='text-zinc-300 italic mt-8'>Detalhes do processador</span>
        <div className='h-px w-full bg-zinc-300'></div>

        <label htmlFor='processorBrand'>Marca</label>
        <input name='processorBrand' id='processorBrand' type="text" placeholder="Intel" className='field'></input>

        <label htmlFor='processorModel'>Modelo</label>
        <input name='processorModel' id='processorModel' type="text" placeholder="i3-8130U" className='field'></input>

        <label htmlFor='clock'>Frequência</label> 
        <div>             
          <input name='clock' id='clock' type="number" placeholder="2.2" className='field w-14'></input>
          <span className='ml-2'>GHz</span>
        </div>
      </div>

      <div className='flex flex-col w-56'>
    
        <span className='text-zinc-300 italic mt-8'>Armazenamento e memória</span>
        <div className='h-px w-full bg-zinc-300'/>

        <div className='flex flex-row justify-between'>
          <div className='flex flex-col'>
            <label className='mt-2' htmlFor='hdd'>HDD</label>
            <div>
              <input name='hdd' id='hdd' type="number" placeholder="1000" className='field w-14'></input>
              <span className='ml-1'>GB</span>
            </div>

            <label className='mt-4' htmlFor='ssd'>SSD</label>
            <div>
              <input name='ssd' id='ssd' type="number" placeholder="256" className='field w-14'></input>
              <span className='ml-1'>GB</span>
            </div>
          </div>

          <div className='flex flex-col'>
            <label className='mt-2' htmlFor='ram'>RAM</label>
            <div>
              <input name='ram' id='ram' type="number" placeholder="1000" className='field w-14'></input>
              <span className='ml-1'>GB</span>
            </div>

            <label className='mt-4' htmlFor='ddr'>DDR</label>
            <input name='ddr' id='ddr' type="number" placeholder="4" className='field w-14'></input>
          </div>
        </div>

        <span className='text-zinc-300 italic mt-8'>Tela e resolução</span>
        <div className='h-px w-full bg-zinc-300'></div>

        <label htmlFor='resolution'>Resolução</label>
        <input name='resolution' id='resolution' type="text" placeholder="1440x900@60Hz" className='field'></input>

        <div className='flex items-center'>
          <Checkbox id='touch'/>
          <label className='ml-2' htmlFor='touch'>Touch</label>
        </div>

        <span className='text-zinc-300 italic mt-4'>Adicione uma Nota</span>
        <div className='h-px w-full bg-zinc-300 mb-1'></div>

        <textarea className='border resize-none outline-none placeholder:italic h-28' 
        placeholder='Touchpad com problema...'/>
      </div>

      <input className='hidden' accept='image' type='file' id="photos"/>
      
      <div className='flex flex-col justify-center items-center gap-20'>
        <label htmlFor="photos">
          <div className='flex justify-center items-center border border-dashed rounded-sm border-zinc-400 text-zinc-400 h-48 w-72 cursor-pointer'>
            <span>Selecione as fotos</span>
          </div>
        </label>
      
        <Button type='submit' className='bg-green-700 w-40 h-8'>Salvar</Button>
        </div>
    </form>
  </>
}