import { useState, useRef,useEffect } from 'react';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import brasCubasImg from './assets/bras_cubas.jpeg';
import Capa from './Capa';
import SeletorCapitulos from './SeletorCApitulos';
import BotoesControle from './BotoesControle';
import livro from './assets/capitulos/livro';
import GerenciadorFaixa from './GerenciadorDeFaixa';

function App() {
  //let taTocando = false;
  //lista de controle
  const [taTocando, definirTaTocando] = useState(false);
  const [faixaAtual, definiFaixaAtual] = useState(0);
  const tagAudio = useRef(null);

  useEffect(() => {
    if(taTocando){
      tocarFaixa()
    }
  }, [
    //listar o conjunto de informações secundarias
    faixaAtual
  ] )

  const inform_livros = {
    nome:'Memórias Póstomas de Brás Cubas',
    autor:'Machado de Assis',
    capitulosTotal: 2,
    capa: brasCubasImg,
    capitulos: livro,
    textoAlternativo: 'Capa do Livro Memórias Póstomas de Brás Cubas'

  };
//essa so pq vai pro usefect
  function tocarFaixa() {
    tagAudio.current.play()
    definirTaTocando(true);
  };

  const pausarfaixa = () => {
    tagAudio.current.pause();
    definirTaTocando(false);
  };

  const tocarOuPausarFaixa = () => {
    if(taTocando){
      pausarfaixa();
    }else{
      tocarFaixa();
    }
  };
  
  //botoes inteligente
  const avancarFaixa = () => {
    if(inform_livros.capitulosTotal === faixaAtual +1){
      definiFaixaAtual(0)
    }else{
      definiFaixaAtual(faixaAtual +1);
    }
  };

  const retrocederFaixa = () =>{
    if(faixaAtual ===0){
      definiFaixaAtual(inform_livros.capitulosTotal -1)
    }else{
      definiFaixaAtual(faixaAtual -1)
    }

  }

  return (
    <>
    {/* promisses */}
    <Capa
     imagemCapa={inform_livros.capa} 
     textoAlternativo={inform_livros.textoAlternativo}/>

    <SeletorCapitulos CapituloAtual={faixaAtual +1} />

    <BotoesControle
     taTocando={taTocando} definirTaTocando={definirTaTocando}
     tocarOuPausarFaixa={tocarOuPausarFaixa} 
     avancarFaixa={avancarFaixa}
     retrocederFaixa={retrocederFaixa}
      />

    <GerenciadorFaixa 
    faixa={inform_livros.capitulos[faixaAtual]} 
    referencia={tagAudio} />

    </>

  )
}

export default App
