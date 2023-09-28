export function NewNotebook(){

  document.title = 'Cadastrar'

  function Submit(){

  }

  return<>
    <form onSubmit={Submit} className="flex-grow">
      <input type="text" placeholder="id"></input>
    </form>
  </>
}