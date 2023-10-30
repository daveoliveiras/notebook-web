import { EditForm } from '@/components/EditForm'
import { notebooks } from '@/contexts/notebooks'
import { api } from '@/lib/axios'
import { Notebook } from '@/types/notebook'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

export function EditPage(){

  const [notebook, setNotebooks] = useState()

  const { id } = useParams()

  document.title = `Notebook ${id}` 
  let idCoverted: number
  if(id){
    idCoverted = parseInt(id)    
  }
  let notebookSelected: Notebook

  const notes = useContext(notebooks)

  async function getNotebooksFromDb(){
      await api.get('/notebook/' + idCoverted).then((response) => {
        notes.push(response.data)
        setNotebooks(response.data)
      }).catch((e) => {
        console.log(e)
      })
  }

  console.log(notes)

  function NotebookEditForm(){
    
    if(notes.length != 0)
    return notes.map((item) => {
      if(item.id == idCoverted){
        notebookSelected = item
        return<EditForm key={item.id} note={notebookSelected}/>
      }
    })
    else{

      getNotebooksFromDb()

      if(notes.length != 0){
        return notes.map((item) => {
          if(item.id == idCoverted){
            notebookSelected = item
            console.log('f')
            if(notebook)
            return<EditForm key={notebook} note={notebook}/>
          }
        })
      }else{
        return<p>Esse notebook não existe
        </p>
      }
    }
  }
  
  return<>{NotebookEditForm()}</>
}