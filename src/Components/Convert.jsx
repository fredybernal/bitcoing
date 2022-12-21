//importaos los estilos y los componentes que necesitamos 
import { useEffect, useState } from "react";//importamos los dos hooks que vamos a usar 
import axios from "axios";
import InputConvert from "./InputConvert"; // Componente
import { FaExchangeAlt } from "react-icons/fa"; // Icono
import "../styles/Convert.css"; // Estilos


export default function Convert() {
  const [coin, setCoin] = useState([])//guardamos los objetos que obtenemos de la base de datos 
  const [selCoin1, setSelCoin1] = useState("btc")/*guardamos la moneda celeccionada en el formulario
  uno que por defecto es botcoin */
  const [selCoin2, setSelCoin2] = useState("eth")/*guardamos la moneda celeccionada en el formulario
  dos que por defecto es ethereum */
  const [mainTxt, setMainTxt] = useState(0)/*guardamos el texto que se escribe en el formulario uno*/
  const [res, setRes] = useState(0)//guardamos el resultado que se va amostrar en el formulario dos 

  // Función asíncrona para obtener los datos de la API
  const getData = async () => {
    // Hacer petición a la API
    const result = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
    );
  const json = await result.json()
    // Establecer el valor de los datos obtenidos
    setCoin(json);

    // Mostrar datos obtenidos en consola
    // console.log(result.data)
  };
  // Obtener los datos cuando el componente cargue
  useEffect(() => {
    // Datos de la API
    getData()
  }, []);

  useEffect(_ => {/*calculamos la convercion de una moneda ala otra */
    let a,b
    coin.forEach(({symbol, current_price}) =>{
      if(symbol == selCoin1){
        a = (mainTxt * current_price) / 1//hacemos una regla de tres para obtener el precio de la primera moneda selccionada 
      }else if(symbol == selCoin2){
        b = current_price//guardamos el precio de la segunda moneda selccionada 
      }
    })
     a ? setRes(a / b) : setRes(0)/*usamos un ternario para en caso de que aun no aya datos de la api
     entonces se mostrara un resultado en zero si no guardamos el resultado de dividir a por b  que seria 
     la convercion */
  },[mainTxt,selCoin1,selCoin2])/*esto solo se ejecuta cuando cambioa el texto del formulario uno o
   cambiamos la moneda seleccionada en cualquier formulario  */

  return (//renderizamos el componente y pasandole las props necesaria a cada formulario 
    <div className="contenedor">
      <h2>Comparación de Monedas</h2>

      <div className="input-convert">
        <InputConvert coin={coin} fun={setSelCoin1} other={selCoin2} text={setMainTxt} type={0} />

        <FaExchangeAlt className="icono" />

        <InputConvert coin={coin} sel="eth" fun={setSelCoin2} other={selCoin1} result={res}/>
      </div>
    </div>
  );
}
