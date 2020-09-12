import React, { useEffect, useState } from 'react';
import Tmdb from './tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie';

export default  () => {

  // Cria a lista para ser exibida
  const [movieList, setMovieList] = useState([]);

  // Estado para o filme em destaque começa como nulo
  const [featuredData, setFeaturedData] = useState(null);

  // Função executa assim que carrega o sistema
  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      //console.log(list);
      setMovieList(list);

      // só pode pegar o filme em destaque depois que pegar a lista
      let originals = list.filter(i => i.slug === 'originals'); // pega a lista e filtra pelo slug que está no arquivo tmdb.js
      // Pegando um originals aleatório e arredonda para baixo em -1
      // Pega um numero aleatório e multiplica pela quantidade de items começando do 0 o indice, subtrai com -1 pq o array começa do 0
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      // exibindo o filme escolhido
      let chosen = originals[0].items.results[randomChosen];

      // Pega as informações da série em Tmdb
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);

      // Teste
      //console.log(chosenInfo);
    }

    loadAll();
  }, []);

  return (
    <div className="page">
      {/* se featuredData for true mostra o FeaturedMovie */}
      {featuredData && 
      <FeaturedMovie item={featuredData} />
      }
      
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
