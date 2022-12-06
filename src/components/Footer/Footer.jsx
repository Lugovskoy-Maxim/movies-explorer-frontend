import React from 'react';
import "./Footer.css";

function Footer(){
  return (
  <section className="footer">
    <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
    <div className='footer__information'>
      <p className='footer__copyright'>&copy;2020</p>
      <ul className='footer__links'>
        <li className='footer__link'>
        	<a href='https://practicum.yandex.ru/' className='footer__authors'>Яндекс.Практикум</a>
        </li>
        <li className='footer__link'>
        	<a href='https://github.com/yandex' className='footer__authors'>Github</a>
        </li>
      </ul>
    </div>
  </section>
)
}
export default Footer;
