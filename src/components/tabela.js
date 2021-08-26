import React, { useState } from "react";
import Icon from '@material-ui/core/Icon';
import ReactAudioPlayer from 'react-audio-player';
import api from "../services/api";
import { listatop } from "../mock_data";
import { MdFavoriteBorder } from "react-icons/md";
import { useEffect } from "react";

const Tabela = (props) => {
const [favoritas, setFavoritas] = useState([])

const favoritar = (data) => {
  setFavoritas((prevState) => ({
    ...prevState,
    [data.id]: data
  }))
}

useEffect (()=> {
  console.log(favoritas)
}, [favoritas])

  return (
    <div>
      <h1>Lista Top 10 Músicas</h1>
      <button>Favoritas</button>
      <table>
        <thead>
          <tr>
            <th>Capa do Álbum</th>
            <th>Título</th>
            <th>Cantor/Artista</th>
            <th>Duração</th>
            <th>Link</th>
            <th>Preview</th>
            <th>Favoritar</th>
          </tr>
        </thead>
        <tbody>
          {listatop.tracks.data.map((musica) => {
            return (
              <tr key={musica.id}>
                <td><img src={musica.artist.picture_small} /></td>
                <td>{musica.title}</td>
                <td>{musica.artist.name}</td>
                <td>{secToMin(musica.duration)}</td>
                <td><a target="_self" href={musica.link}>&#127925;</a></td>
                <td><ReactAudioPlayer source src={musica.preview} controls/></td>
                <td style={{textAlign: 'center'}} onClick={() => favoritar(musica)}><MdFavoriteBorder /></td>
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
