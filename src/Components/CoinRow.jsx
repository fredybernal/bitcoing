//importamos los estilos y los componentes que necesitamos 
import React from "react";
import "../styles/coinRow.css"
import Graph from './Graph'
import {deleteDec, colorDec, numberF} from '../App'//el number f sirve para poner los puntos en los miles 

export default function CoinRow({ coin, index }) {/*recibimos unas props que traen informacion de la api*/
  console.log(index);
  return (//renderizamos el ocmponente y lo llenamos con las props 
    <tr>
      <td>{index}</td>
      <td>
        <div className="coin_image_container">
            <img src={coin.image} title={coin.name} alt={coin.name} />
        </div>
      </td>
      <td>{numberF.format(coin.current_price)}US$</td>
      <td className={colorDec(coin.market_cap_change_percentage_24h)}>{deleteDec(coin.market_cap_change_percentage_24h, 2)}%</td>
      <td>{numberF.format(coin.total_volume)}US$</td>
      <td>{numberF.format(coin.market_cap)}US$</td>
      <td><Graph coin={coin.id} days={7} color={colorDec(coin.market_cap_change_percentage_24h)}/></td>
    </tr>
  );
}
