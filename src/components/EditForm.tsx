import { Button } from '@/components/ui/button'
import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from 'react'
import { api } from '../lib/axios'
import { Notebook } from '@/types/notebook'

type props = {
  note: Notebook
}

export function EditForm(props: props){
  document.title = 'Cadastrar'
  const { note } = props
  const currentPaths: string[] = []
  note.photos.forEach((item) => {
    currentPaths.push('https://notebooks-fastify.s3.us-east-2.amazonaws.com/' + item.path)
  })

  const [id] = useState(note.id)
  const [brand, setBrand] = useState(note.brand.name)
  const [model, setModel] = useState(note.model)
  const [system, setSystem] = useState(note.system.name)
  const [processorBrand, setProcessorBrand] = useState(note.processor_brand)
  const [processorModel, setProcessorModel] = useState(note.processor_model)
  const [clock, setClock] = useState(note.clock)
  const [hdd, setHdd] = useState(note.hd)
  const [ssd, setSsd] = useState(note.ssd)
  const [ram, setRam] = useState(note.ram)
  const [ddr, setDdr] = useState(note.ddr)
  const [resolution, setResolution] = useState(note.resolution)
  const [touch, setTouch] = useState(note.touch)

  const [notion, setNotion] = useState(note.note)
  /** */

  const [previewIndex, setPriviewIndex] = useState(0)
  const [URls, setURLs] = useState(currentPaths)

  const [status, setStatus] = useState<string>('Salvar')
  const [photoFiles, setPhotoFiles] = useState<File[]>([])

  async function submit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    const data = new FormData()

    const obj = {

      id: id,

      model: model,

      processor_brand: processorBrand,
      processor_model: processorModel,
      clock: clock,
      hd: hdd ? hdd : null,
      ssd: ssd,
      ram: ram,
      ddr: ddr,
      resolution: resolution,

      touch: touch,
      note: notion,
      photos: ['']
    }

    setStatus('Alterando...')

    let paths: string[] = []
    console.log(photoFiles.length)

    if(photoFiles.length != 0){
      photoFiles.forEach((item) => {
        data.append('photo', item)
      })

      await api.post('/upload-images', data, {
          headers:{'Content-type': 'multipart/formd-data'}
          }).then(async (response) => {
            paths = await response.data
            console.log('novas fotos?')
            console.log(paths)
            obj.photos = paths
      })
      
      await api.put('/notebook', obj).then(() => {
        setStatus('Editado com foto!')
      }).catch(function (e){
        console.log(e)
      })
    }
    else{
      api.put('/notebook', obj).then(() => {
        setStatus('Editado sem foto!')
      }).catch(function (e){
        console.log(e)
      })
    }

  }

  function uploadPhotos(event: ChangeEvent<HTMLInputElement>){
    const { files } = event.target
    const filesFromInput = files
    const getURLs: string[] = []
    const getPhotoFiles: File[] = []

    if(filesFromInput){
      Array.from(filesFromInput).forEach((item) => {
        const preview = URL.createObjectURL(item)
        getURLs.push(preview)
        getPhotoFiles.push(item)
      })

      setURLs(getURLs)
      setPhotoFiles(getPhotoFiles)
    }
  }

  function next(event: MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    if(previewIndex + 1 >= URls.length){
      setPriviewIndex(0)
    }
    else{
      setPriviewIndex(previewIndex + 1)
    }

  }

  function back(event: MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    if(previewIndex - 1 < 0){
      setPriviewIndex(URls.length - 1)
    }
    else{
      setPriviewIndex(previewIndex - 1)
    }
  }

  return<>
    <form onSubmit={submit} className="flex-grow flex justify-center gap-32">

      <div className='flex flex-col mr-1'>

        <span className='text-zinc-300 italic mt-8'>Detalhes gerais</span>
        <div className='h-px w-full bg-zinc-300'></div>

        <label htmlFor='id'>Código</label>
        <input name='id' id='id' type="number" min={1} placeholder="id" className='field' value={id} readOnly={true}></input>

        <label htmlFor='brand'>Marca</label>
        <input name='brand' id='brand' type="text" placeholder="Dell" className='field' value={brand} 
        onChange={(event) => {
          setBrand(event.target.value)
        }}></input>

        <label htmlFor='model'>Modelo</label>
        <input name='model' id='model' type="text" placeholder="Inspiron 15" className='field' value={model}
        onChange={(event) => {
          setModel(event.target.value)
        }}></input>

        <label htmlFor='system'>Sistema</label>
        <input name='system' id='system' type="text" placeholder="Windows" className='field' value={system}></input>

        <span className='text-zinc-300 italic mt-8'>Detalhes do processador</span>
        <div className='h-px w-full bg-zinc-300'></div>

        <label htmlFor='processorBrand'>Marca</label>
        <input name='processorBrand' id='processorBrand' type="text" placeholder="Intel" className='field' value={processorBrand}
        onChange={(event) => {
          setProcessorBrand(event.target.value)
        }}></input>

        <label htmlFor='processorModel'>Modelo</label>
        <input name='processorModel' id='processorModel' type="text" placeholder="i3-8130U" className='field' value={processorModel}
        onChange={(event) => {
          setProcessorModel(event.target.value)
        }}></input>

        <label htmlFor='clock'>Frequência</label> 
        <div>             
          <input name='clock' id='clock' type="number" placeholder="2.2" className='field w-14' value={clock}
          onChange={(event) => {
            setClock(parseFloat(event.target.value))
          }}></input>
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
              <input name='hdd' id='hdd' type="number" placeholder="1000" className='field w-14' value={hdd ? hdd : ''} 
              onChange={(event) =>{
                setHdd(parseInt(event.target.value))

                // if(event.target.value == ''){
                //   // console.log(parseInt(event.target.value) + 'ed')
                //   setHdd(parseInt(event.target.value))
                // }else{
                //   setHdd(null)
                // }
              }}></input>
              <span className='ml-1'>GB</span>
            </div>

            <label className='mt-4' htmlFor='ssd'>SSD</label>
            <div>
              <input name='ssd' id='ssd' type="number" placeholder="256" className='field w-14' value={ssd ? ssd : ''}
              onChange={(event) => {
                console.log(event.target.value)
                if(event.target.value == '')
                  setSsd(null)
                else
                  setSsd(parseInt(event.target.value))
              }}></input>
              <span className='ml-1'>GB</span>
            </div>
          </div>

          <div className='flex flex-col'>
            <label className='mt-2' htmlFor='ram'>RAM</label>
            <div>
              <input name='ram' id='ram' type="number" placeholder="1000" className='field w-14' value={ram}
              onChange={(event) => {
                setRam(parseInt(event.target.value))
              }}></input>
              <span className='ml-1'>GB</span>
            </div>

            <label className='mt-4' htmlFor='ddr'>DDR</label>
            <input name='ddr' id='ddr' type="number" placeholder="4" className='field w-14' value={ddr}
            onChange={(event) => {
              setDdr(parseInt(event.target.value))
            }}></input>
          </div>
        </div>

        <span className='text-zinc-300 italic mt-8'>Tela e resolução</span>
        <div className='h-px w-full bg-zinc-300'></div>

        <label htmlFor='resolution'>Resolução</label>
        <input name='resolution' id='resolution' type="text" placeholder="1440x900@60Hz" className='field' value={resolution}
        onChange={(event) => {
          setResolution(event.target.value)
        }}></input>

        <div className='flex items-center'>
          <input type='checkbox' id='touch' checked={touch} 
          onChange={(event) => {
            setTouch(event.target.checked)
          }}></input>
          <label className='ml-2' htmlFor='touch'>Touch</label>
        </div>

        <span className='text-zinc-300 italic mt-4'>Adicione uma Nota</span>
        <div className='h-px w-full bg-zinc-300 mb-1'></div>

        <textarea className='border resize-none outline-none placeholder:italic h-28' 
        placeholder='Touchpad com problema...'
        value={notion}
        onChange={(event) => {
          setNotion(event.target.value)
        }}/>
      </div>

      <input className='hidden' accept='image' multiple={true} type='file' id="photos" onChange={uploadPhotos}/>
      
      <div className='flex flex-col justify-center items-center gap-20'>
        <label htmlFor="photos">
          <div className='flex justify-center items-center border border-dashed rounded-sm border-zinc-400 text-zinc-400 h-48 w-72 cursor-pointer'>
            {URls.length ? (<>
            <button onClick={back}>-</button>
            <img src={URls[previewIndex]}></img>
            <button onClick={next}>+</button>
            </>
            ) : <span>Selecione as fotos</span>}
          </div>
        </label>
      
        <Button type='submit' className='bg-green-700 w-40 h-8'>{status}</Button>
        </div>
    </form>
  </>
}