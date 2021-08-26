import React, { useState } from "react";
import ReactAudioPlayer from 'react-audio-player';
import { listatop } from "../mock_data";
import { MdFavoriteBorder } from "react-icons/md";

const Tabela = (props) => {
const [favoritas, setFavoritas] = useState([])
const [dadosTabela, setDadosTabela] = useState({
  nome: 'Top 10 Músicas',
  dados: listatop.tracks.data,
  botao: 'Músicas Favoritas'
})

const favoritar = (data) => {
  const existe = favoritas.find(element => element.id == data.id)
  if (!!existe) {
    let temp = favoritas
    temp.splice(favoritas.indexOf(existe), 1)
    setFavoritas(temp)
  } else {
  setFavoritas((prevState) => ([
    ...prevState,
    data
  ]))
  }
}

const mudaTabela = () => {
  if(dadosTabela.nome === 'Top 10 Músicas'){
    setDadosTabela(() => ({
      nome : 'Músicas Favoritas',
      dados : favoritas,
      botao: 'Top 10 Músicas'
    }))
  } else {
    setDadosTabela(() => ({
      nome: 'Top 10 Músicas',
      dados: listatop.tracks.data,
      botao: 'Músicas Favoritas'
    }))
  }
}

  return (
    <div>
      <h1>Lista Top 10 Músicas</h1>
      <button onClick={() => mudaTabela()}>Visualizar {dadosTabela.botao}</button>
      <table>
        <thead>
          <tr>
            <th>Capa do Álbum</th>
            <th>Título</th>
            <th>Cantor/Artista</th>
            <th>Duração</th>
            <th>Link</th>
            <th>Preview</th>
            {dadosTabela.nome === 'Top 10 Músicas' && <th>Favoritar</th>}
          </tr>
        </thead>
        <tbody>
          {dadosTabela.dados.map((musica) => {
            return (
              <tr key={musica.id}>
                <td><img src={musica.artist.picture_small} alt='Capa do Álbum' /></td>
                <td>{musica.title}</td>
                <td>{musica.artist.name}</td>
                <td>{secToMin(musica.duration)}</td>
                <td><a target="_self" href={musica.link}>&#127925;</a></td>
                <td><ReactAudioPlayer source src={musica.preview} controls/></td>
                {dadosTabela.nome === 'Top 10 Músicas' && <td style={{textAlign: 'center'}} onClick={() => favoritar(musica)}><MdFavoriteBorder /></td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const secToMin = (tempo) => {
    var minutes = Math.floor( tempo / 60 );
    var seconds = tempo % 60;
    return (minutes + ":" + seconds);
}

export default Tabela;
