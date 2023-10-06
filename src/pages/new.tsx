import './new.css'
import { Button } from '@/components/ui/button'
import { ChangeEvent, FormEvent, MouseEvent, useContext, useRef, useState } from 'react'
import { ax } from '../lib/axios'
import { photos, changePhotos } from '@/lib/preview'
import { foto, changeFotos } from '@/lib/files'

export function NewNotebook(){
  const idRef = useRef<HTMLInputElement>(null)
  const brandRef = useRef<HTMLInputElement>(null)
  const modelRef = useRef<HTMLInputElement>(null)
  const systemRef = useRef<HTMLInputElement>(null)
  const processorBrandRef = useRef<HTMLInputElement>(null)
  const processorModelRef = useRef<HTMLInputElement>(null)
  const clockRef = useRef<HTMLInputElement>(null)
  const hddRef = useRef<HTMLInputElement>(null)
  const ssdRef = useRef<HTMLInputElement>(null)
  const ddrRef = useRef<HTMLInputElement>(null)
  const ramRef = useRef<HTMLInputElement>(null)
  const resolutionRef = useRef<HTMLInputElement>(null)
  const touchRef = useRef<HTMLInputElement>(null)
  const noteRef = useRef<HTMLTextAreaElement>(null)

  document.title = 'Cadastrar'

  const [preview, setPreview] = useState<string | null>(null)
  const photoURL = useContext(photos)
  const hate = useContext(foto)

  const blob: string[] = []
  const images: File[] = []


  function submit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    const data = new FormData()
    let paths: string[] = []

    // changeFotos([])

    const obj = {
      // id: idRef.current?.value ? parseInt(idRef.current?.value) : '',
      // ram: ramRef.current?.value ? parseInt(ramRef.current?.value) : '',
      // ddr: ddrRef.current?.value ? parseInt(ddrRef.current?.value) : '',
      // hd: hddRef.current?.value ? parseInt(hddRef.current?.value) : '',
      // // ssd: ssdRef.current?.value ? parseInt(ssdRef.current?.value) : '',
      // // graphics_card: '',
      // model: 'ss',
      // note: noteRef.current?.value ? parseInt(noteRef.current?.value) : '',
      // resolution: resolutionRef.current?.value ? parseInt(resolutionRef.current?.value) : '',
      // inch: 2,
      // touch: true,
      // clock: clockRef.current?.value ? parseInt(clockRef.current?.value) : '',
      // processor_brand: processorBrandRef.current?.value ? parseInt(processorBrandRef.current?.value) : '',
      // processor_model: 'a',
      // system: {
      //   name: 'fdfdfdf',
      //   version: 11
      // },
      // brand:{
      //   name: 'dfdfdf'
      // },
      // photos: ['f']
      
        id: idRef.current?.value ? parseInt(idRef.current?.value) : '',
        ram: 12,
        ddr: 4,
        hd: 256,
        model: 'Aspire 3',
        note: 'Muito ruim.',
        resolution: '1300x760@60Hz',
        inch: null,
        processor_model: 'i3-8130U',
        processor_brand: 'Intel',
        clock: 2.2,
        touch: true,
        system: { name: 'Windows', version: 11 },
        brand: { name: 'Dell' },
        photos: []      
    }

    console.log(obj)

    hate.forEach((photo) => {
      data.append('photo', photo)
    })

    ax.post('/upload', data, {
      headers:{'Content-type': 'multipart/formd-data'}
      }).then(async (response) => {
        paths = await response.data
        console.log(response.data)

        obj.photos = paths

        ax.post('/notebook', obj).then((response) => {
          console.log(response)
        }).catch(function (e){
          console.log(e)
        })
    })

    // ax.post('/notebook', obj).then((response) => {
    //   console.log(response)
    // }).catch(function (e){
    //   console.log(e)
    // })
  }

  function uploadPhotos(event: ChangeEvent<HTMLInputElement>){
    const { files } = event.target
    if(files){

      Array.from(files).forEach((photo) => {
        const preview = URL.createObjectURL(photo)
        console.log(preview)
        blob.push(preview)
        images.push(photo)
      })

      changePhotos(blob)
      changeFotos(images)

      setPreview(blob[0])
      // console.log(blob)
      console.log(photoURL)
      
    }
  }

  function next(event: MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    console.log('apertou')
    setPreview(photoURL[2])
  }

  function back(event: MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    console.log('apertou')
    setPreview(photoURL[1])
  }

  return<>
    <form onSubmit={submit} className="flex-grow flex justify-center gap-32">

      <div className='flex flex-col mr-1'>

        <span className='text-zinc-300 italic mt-8'>Detalhes gerais</span>
        <div className='h-px w-full bg-zinc-300'></div>

        <label htmlFor='id'>Código</label>
        <input name='id' id='id' type="number" min={1} placeholder="id" className='field' ref={idRef}></input>

        <label htmlFor='brand'>Marca</label>
        <input name='brand' id='brand' type="text" placeholder="Dell" className='field' ref={brandRef}></input>

        <label htmlFor='model'>Modelo</label>
        <input name='model' id='model' type="text" placeholder="Inspiron 15" className='field' ref={modelRef}></input>

        <label htmlFor='system'>Sistema</label>
        <input name='system' id='system' type="text" placeholder="Windows" className='field' ref={systemRef}></input>

        <span className='text-zinc-300 italic mt-8'>Detalhes do processador</span>
        <div className='h-px w-full bg-zinc-300'></div>

        <label htmlFor='processorBrand'>Marca</label>
        <input name='processorBrand' id='processorBrand' type="text" placeholder="Intel" className='field' ref={processorBrandRef}></input>

        <label htmlFor='processorModel'>Modelo</label>
        <input name='processorModel' id='processorModel' type="text" placeholder="i3-8130U" className='field' ref={processorModelRef}></input>

        <label htmlFor='clock'>Frequência</label> 
        <div>             
          <input name='clock' id='clock' type="number" placeholder="2.2" className='field w-14' ref={clockRef}></input>
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
              <input name='hdd' id='hdd' type="number" placeholder="1000" className='field w-14' ref={hddRef}></input>
              <span className='ml-1'>GB</span>
            </div>

            <label className='mt-4' htmlFor='ssd'>SSD</label>
            <div>
              <input name='ssd' id='ssd' type="number" placeholder="256" className='field w-14' ref={ssdRef}></input>
              <span className='ml-1'>GB</span>
            </div>
          </div>

          <div className='flex flex-col'>
            <label className='mt-2' htmlFor='ram'>RAM</label>
            <div>
              <input name='ram' id='ram' type="number" placeholder="1000" className='field w-14' ref={ramRef}></input>
              <span className='ml-1'>GB</span>
            </div>

            <label className='mt-4' htmlFor='ddr'>DDR</label>
            <input name='ddr' id='ddr' type="number" placeholder="4" className='field w-14' ref={ddrRef}></input>
          </div>
        </div>

        <span className='text-zinc-300 italic mt-8'>Tela e resolução</span>
        <div className='h-px w-full bg-zinc-300'></div>

        <label htmlFor='resolution'>Resolução</label>
        <input name='resolution' id='resolution' type="text" placeholder="1440x900@60Hz" className='field' ref={resolutionRef}></input>

        <div className='flex items-center'>
          <input type='checkbox' id='touch' ref={touchRef}></input>
          <label className='ml-2' htmlFor='touch'>Touch</label>
        </div>

        <span className='text-zinc-300 italic mt-4'>Adicione uma Nota</span>
        <div className='h-px w-full bg-zinc-300 mb-1'></div>

        <textarea className='border resize-none outline-none placeholder:italic h-28' 
        placeholder='Touchpad com problema...'
        ref={noteRef}/>
      </div>

      <input className='hidden' accept='image' multiple={true} type='file' id="photos" onChange={uploadPhotos}/>
      
      <div className='flex flex-col justify-center items-center gap-20'>
        <label htmlFor="photos">
          <div className='flex justify-center items-center border border-dashed rounded-sm border-zinc-400 text-zinc-400 h-48 w-72 cursor-pointer'>
            {preview ? (<>
            <button onClick={back}>-</button>
            <img src={preview}></img>
            <button onClick={next}>+</button>
            </>
            ) : <span>Selecione as fotos</span>}
          </div>
        </label>
      
        <Button type='submit' className='bg-green-700 w-40 h-8'>Salvar</Button>
        </div>
    </form>
  </>
}