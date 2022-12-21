//importamos los estilos y los componenetes necesarios 
import React from "react";
import "../styles/tableCoins.css";
import CoinRow from "./CoinRow";

function TableCoins({ coins }) {/*recibimo el arreglo de json de la api */
  console.log(coins);
  return (
    <table className="table_coins">
      <thead>
        <tr>
          <td>#</td>
          <td>Moneda</td>
          <td>Precio</td>
          <td>24h</td>
          <td>Vol. total</td>
          <td>Cap. mercado</td>
          <td>Ultimos 7 dias</td>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (/*dibujamos cada ilerea de la tabla y le pasamos la cripto moneda 
        que debe dibujar */
          <CoinRow coin={coin} key={index} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
}

export default TableCoins;
