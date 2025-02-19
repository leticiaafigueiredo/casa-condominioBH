import CadastroCliente from '../cliente/CadastroCliente'

const Cadastro = (props) => {
  return (
    <div>
        {
            props.usuario == null || props.usuario.role
            ?
            <CadastroCliente />
            :
            undefined
        }
      
    </div>
  )
}

export default Cadastro
