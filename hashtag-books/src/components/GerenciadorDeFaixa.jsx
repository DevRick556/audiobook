const GerenciadorFaixa = ({faixa, referencia}) => {
    return <audio ref={referencia} src={faixa} type="audio/mp3"/>
}

export default GerenciadorFaixa;