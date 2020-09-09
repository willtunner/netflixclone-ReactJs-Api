import React, { useEffect, useState } from 'react';
import Tmdb from './tmdb';
import MovieRow from './components/MovieRow';
import './App.css';

export default  () => {

  // Cria a lista para ser exibida
  const [movieList, setMovieList] = useState([]);

  // Função executa assim que carrega o sistema
  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      //console.log(list);
      setMovieList(list);
    }
    loadAll();
  }, []);

  return (
    <div className="page">
      <section className="lists">
        {movieList.map((item, key) =>(
          <MovieRow  key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  );
}


// https://www.youtube.com/watch?v=tBweoUiMsDg
// https://fonts.google.com/specimen/Roboto?query=roboto&sidebar.open=true&selection.family=Roboto:wght@400;700
