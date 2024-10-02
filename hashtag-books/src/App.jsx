import { useState, useRef,useEffect } from 'react';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import coverBook from './assets/bras_cubas/capa.jpeg';
import Capa from './components/Capa';
import SeletorCapitulos from './components/SeletorCapitulos';
import BotoesControle from './components/BotoesControle';
import tracks from './assets/bras_cubas/capitulos/addTrack';
import GerenciadorFaixa from './components/GerenciadorDeFaixa';

function App() {
  //let taTocando = false;
  //lista de controle
  const [taTocando, definirTaTocando] = useState(false);
  const [faixaAtual, definiFaixaAtual] = useState(0);
  const tagAudio = useRef(null);
  
  const inform_livros = {
    nome:'Memórias Póstomas de Brás Cubas',
    autor:'Machado de Assis',
    capitulosTotal: 2,
    capa: coverBook,
    capitulos: tracks,
    textoAlternativo: 'Capa do Livro Memórias Póstomas de Brás Cubas'
  };

  useEffect(() => {
    const isPlaying = taTocando ? "▶" : "❚❚"
    const actualTrack = faixaAtual +1

    document.title = `${isPlaying} ${inform_livros.nome} - Capítulo ${actualTrack}`

  }, [taTocando, faixaAtual])

  const tocarOuPausarFaixa = () => {
    if (taTocando) {
      tagAudio.current.pause()
      return definirTaTocando(false)
    }

    tagAudio.current.play()
    return definirTaTocando(true)

  };
  
  //botoes inteligente
  const avancarFaixa = () => {
    if (inform_livros.capitulosTotal === faixaAtual +1) {
      return definiFaixaAtual(0)
    }

    return definiFaixaAtual(faixaAtual+1)
  };

  const retrocederFaixa = () => {
    if(faixaAtual === 0){
      return definiFaixaAtual(inform_livros.capitulosTotal -1)
    }

    return definiFaixaAtual(faixaAtual -1)
  }

  return (
    <>
      {/* promisses */}
      <Capa
      imagemCapa={inform_livros.capa} 
      textoAlternativo={inform_livros.textoAlternativo}
      />

      <SeletorCapitulos CapituloAtual={faixaAtual} />

      <BotoesControle
        taTocando={taTocando}
        definirTaTocando={definirTaTocando}
        tocarOuPausarFaixa={tocarOuPausarFaixa} 
        avancarFaixa={avancarFaixa}
        retrocederFaixa={retrocederFaixa}
      />

      <GerenciadorFaixa 
        faixa={inform_livros.capitulos[faixaAtual]} 
        referencia={tagAudio}
      />
    </>
  )
}

export default App
