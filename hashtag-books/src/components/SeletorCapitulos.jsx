function SeletorCapitulos(props){
    return(
        <button className="seletor">
            <i className="bi bi-list-task"></i>
            <p>{`Capítulo ${props.CapituloAtual+1}`}</p>
        </button>
    )
}

export default SeletorCapitulos;