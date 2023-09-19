import { ax } from '../lib/axios'

export function ListAll(){

  ax.get('/notebook').then((response) => {
    console.log(response.data)
  })

  return<>
    listar
  </>
}