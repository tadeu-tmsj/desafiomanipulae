import React, { useState } from "react";
import ReactAudioPlayer from 'react-audio-player';
import { listatop } from "../mock_data";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import styled from "styled-components";

const Page = styled.div`
display: flex;
flex-direction: column;
`
const Title = styled.h1`
text-align : center;
`
const Button = styled.button`
align-self: center;
`
const Table = styled.table`
  margin: 0 auto;

  .capa{
    width: 115px;
    text-align: center;
  }
  .titulo{
    width: 200px;
  }
  .artista{
    width: 200px;
  }
  .duracao{
    width: 65px;
  }
  .link{
    width: 30px;
  }
  .{
    preview: 300px;
  }
  .favoritar{
    width: 70px;
    text-align: center;
  }
`

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
    <Page>
      <Title>Lista Top 10 Músicas</Title>
      <Button onClick={() => mudaTabela()}>Visualizar {dadosTabela.botao}</Button>
      <Table>
        <thead>
          <tr>
            <th className='capa'>Capa do Álbum</th>
            <th className='titulo'>Título</th>
            <th className='artista'>Cantor/Artista</th>
            <th className='duracao'>Duração</th>
            <th className='link'>Link</th>
            <th className='preview'>Preview</th>
            {dadosTabela.nome === 'Top 10 Músicas' && <th className='favoritar'>Favoritar</th>}
          </tr>
        </thead>
        <tbody>
          {dadosTabela.dados.map((musica) => {
            return (
              <tr key={musica.id}>
                <td className='capa'><img src={musica.artist.picture_small} alt='Capa do Álbum' /></td>
                <td className='titulo'>{musica.title}</td>
                <td className='artista'>{musica.artist.name}</td>
                <td className='duracao'>{secToMin(musica.duration)}</td>
                <td className='link'><a target="_self" href={musica.link}>&#127925;</a></td>
                <td className='preview'><ReactAudioPlayer source src={musica.preview} controls/></td>
                {dadosTabela.nome === 'Top 10 Músicas' &&
                <td className='favoritar'
                onClick={() => favoritar(musica)}>
                {!!favoritas.find(favorito => favorito.id == musica.id) ? <MdFavorite /> : <MdFavoriteBorder />}</td>}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Page>
  );
};

const secToMin = (tempo) => {
    var minutes = Math.floor( tempo / 60 );
    var seconds = tempo % 60;
    return (minutes + ":" + seconds);
}

export default Tabela;
