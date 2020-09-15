import React, {useState} from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default ({ title, items }) => {
    //Estado para armazenar posição da lista para scrollar pelas setas
    const [scrollX, setScrollX] = useState(-400);

    // Funções de clique nas setas esquerda e direita
    const handleLeftArrow = () => {

        // Math.round(window.innerWidth / 2) = pega o tamanho da tela e divide por 2 e passa esse valor para scrollar para o lado
        let x = scrollX + Math.round(window.innerWidth / 2);

        // Quando chegar no limite ele não deixa passar evitando bug
        if(x > 0){
            x = 0;
        }

        setScrollX(x);
    }

    const handleRightArrow = () => {
        // Math.round(window.innerWidth / 2) = pega o tamanho da tela e divide por 2 e passa esse valor para scrollar para o lado
        let x = scrollX - Math.round(window.innerWidth / 2);

        // Pega a largura total pela quantidade de itens e multiplica pela largura fixa de cada item
        let listW = items.results.length * 150;

        // Pega o tamanho da tela menos a lista
        // se for maior que x volta um pouco
        if((window.innerWidth - listW) > x ){
            // pega o tamanho da tela menos os 30px de cada lado = 60 para dar o tamanho certo    
            x = (window.innerWidth - listW) - 60;
        }

        setScrollX(x);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>

            {/* Seta para a esquerda */}
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}} />
            </div>

            {/* Seta para a direita */}
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>

            <div className="movieRow--listarea">
                {/* Usa o scrollX no marginLeft para ficar dinamico */}
                <div className="movieRow--list" style={{marginLeft: scrollX,
                width: items.results.length * 150}}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="movieRow--item">
                            {/* esse w300 define o tamanho da imagem, se colocar original fica o tamanho gigante  */}
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

//1h:01:13