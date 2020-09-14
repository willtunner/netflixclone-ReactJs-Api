import React from 'react';
import './FeaturedMovie.css';

export default ({ item }) => {
    // Pega as informaçõs que vem no item e passa para o console para testar e ver os nomes
    console.log(item);

    // Pega o ano da serie em destaque completo, para destacar só o ano coloca o getFullYear()
    let firstDate = new Date(item.first_air_date);
    //console.log(firstDate);
    //console.log(firstDate.getFullYear());

    //Paga pegar os gerenos que vem em um array
    let genres = [];
    for (let i in item.genres) {
        genres.push(item.genres[i].name);
    }



    return (
        <section className="featured" style={{
            backgroundSize: 'cover',// Aparece a imagem sem cortar
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
        }}>
            {/* Div com efeito esfumaçado, verificar no css */}
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    {/* Div com o titulo do filme em destaque */}
                    <div className="featured--name">{item.original_name}</div>
                    {/* Div com as informações das series em destaque */}
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        {/* Função condicional se tiver mais de uma temporada coloca o "S" */}
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                        {/* Descrição do destaque */}
                    </div>

                    <div className="featured--description">{item.overview}</div>
                    {/* Botões Assistir  e trailer */}
                    <div className="featured--buttons">
                        <a href={`/watch/${item.id}`} className="featured--watchbutton">► Assistir</a>
                        <a href={`/list/add${item.id}`} className="featured--mylistbutton">+ Minha Lista</a>
                    </div>
                    <div className="featured--genres"><strong>Gênero:</strong>{genres.join(', ')}</div>



                </div>
            </div>
        </section>
    );
}