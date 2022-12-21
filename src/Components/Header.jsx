//importamos los estilos y los conponentes necesarios 
import React from 'react';
import '../styles/Header.css';
import { useTheme } from '../Context/ThemeProvider';

export default function Header({currencys, fun, cur}){/*recibimos unas props que son el arreglo de divisas*/
  const {theme, toggleTheme} = useTheme();
  
  return (
    <header className='app-header'>
      <p>Crypto Stadistics</p>
      <div className='select-button'>
      <select value={cur} name="coinSelect" id="coinSelect" onChange={_ => {fun(document.getElementById("coinSelect").value)}}>
        {/*al canbiar la divisa cambiamos el estado del padre y le ponemos la nueva seleccionada */}
        {currencys.map((item, index) => <option value={item} key={index} >{item}</option>)}  
      </select>
      <button className='toogleMode' onClick={toggleTheme}>
        {theme.img}
      </button>
      </div>
    </header>
  )
}