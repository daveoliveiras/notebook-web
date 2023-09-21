import { Notebook } from '@/lib/notebook'
import { useParams } from 'react-router-dom'

export function Edit(){
  const { id } = useParams()

  document.title = `Notebook ${id}` 

  return<>
    {id}
  </>
}