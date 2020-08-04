import React from "react";
import whatsappIcon from "../../assets/images/icons/whatsapp.svg"
import "./styles.css";
function TeacherItem () {
  return (
    <article className="teacher-item">
          <header>
            <img src="https://scontent-gru2-2.cdninstagram.com/v/t51.2885-19/108775332_1367638186765859_499797927037468416_n.jpg?_nc_ht=scontent-gru2-2.cdninstagram.com&_nc_ohc=gkybX4AykzoAX-gEBXM&oh=b0db6bb7d0381f06c24332affe5f5d3c&oe=5F51D0F7" alt="Jorge Igor"/>
            <div>
              <strong>Jorge Igor</strong>
              <span>Programação</span>
            </div>
          </header>
          <p>
          As vezes não sei nem onde eu tô, mas consigo me localizar facilmente em qualquer lugar. 
          Tenho memória fotográfica e nunca fico perdido. 
          <br/>
          Eu ensino a galera como não se perder na vida, 
          com lições geográficas simples pra você nunca mais precisar de 
          mapa na sua bela vida.
          </p>
          <footer>
            <p>Preço/hora:
            <strong>R$ 100,oo</strong>
            </p>
            <button type='button'>
              <img src={whatsappIcon} alt="whatsapp"/>
              Entrar em contanto
            </button>
          </footer>
        </article>
  )
}

export default TeacherItem