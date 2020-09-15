import React, { useEffect, useState } from 'react';
import Tmdb from './tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  // Cria a lista para ser exibida
  const [movieList, setMovieList] = useState([]);

  // Estado para o filme em destaque começa como nulo
  const [featuredData, setFeaturedData] = useState(null);

  // Estado para mudar a cor do header quando der scroll na pagina
  const [blackHeader, setBlackHeader] = useState(false);

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
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
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

  // Função para monitorar o scroll do mouse para mudar o background do header
  useEffect(() => {
    const scrollListener = () => {

      // Se a posição do scroll no eixo y estiver maior que 10
      if (window.scrollY > 150) {
        setBlackHeader(true); // seta o fundo para preto
      } else {
        setBlackHeader(false);// se não transparente
      }
    }

    // Quando tiver um movimento de scroll na página executa a função do scrollListener
    window.addEventListener('scroll', scrollListener);

    // remove o evento quando sai da página
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      {/* Passa para o component Header o estado criado acima */}
      <Header black={blackHeader} />

      {/* se featuredData for true mostra o FeaturedMovie */}
      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">💗</span> pela GreenCode <br />
        Direitos de imagem para Netflix< br />
        Dados pedos do site Themoviedb.org
      </footer>

      {/* 
      Carrega o loading na tela 
      se o movieList não tiver nada mostra o loading
      */}
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2000,c_limit/Netflix_LoadTime.gif" alt="carregando" />
        </div>
      }
    </div>
  );
}


// https://www.youtube.com/watch?v=tBweoUiMsDg
// https://fonts.google.com/specimen/Roboto?query=roboto&sidebar.open=true&selection.family=Roboto:wght@400;700
/**
 * Instalado o Material-ui
 * npm install @material-ui/core
 * npm install @material-ui/icons
 */
