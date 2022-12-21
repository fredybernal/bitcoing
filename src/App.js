/*se estan importando os componentes que se van a necesitar en la pagina principal */
import {useEffect, useState} from 'react'
import "./styles/App.css"; 
import Header from './Components/Header';
import Footer from './Components/Footer';
import Card from './Components/Card';
import Convert from './Components/Convert';
import TableCoins from './Components/TableCoins';
import CardPrincipal from './Components/CardPrincipal';
import {ThemeProvider} from "./Context/ThemeProvider";

export default function App() {
  const [coins, setCoins] = useState()/*guardamos el arreglo de criptos que nos da la api */
  const [currency, setCurrency] = useState()//guardamos el arreglo de divisas que nos da la api
  const [selCur, setSelCur] = useState("usd")//guardamos la divisa seleccionada actualmente 
  const getData = async () =>{
    /*es una funcion para consumir los datos de la api*/
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selCur}&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C90d%2C1y`)
    //esperamos a resolver la promesa que nos devuelve fetch y lo guardamos en una variable 
    const json = await response.json()//guardamos el json que nos retorna la api en una variable 
    const response_cur = await fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
    const cur = await response_cur.json()
    setCoins(json)//guardamos lo que nos retorno la api en los estados 
    setCurrency(cur)
  }
  useEffect(() => {//obtenemos los datos de la api la primera vez que se renderisa el componente 
    getData()
  },[])
  useEffect(() => {//obtener los datos de la api cada vez que se cambia la divisa 
    getData()
  },[selCur])
  /* async function getApi(){
    /* fetch("https://api.coingecko.com/api/v3/simple/price?idszfsdf")
    .then(response => response.json())/
    .then(json => console.log(json))
    .catch(e => console.log("Error:",e))
    try{
      const response = await fetch("https://api.coingecko.com/api/v3/cosdfsd")
      const json = await response.json()
      console.log(json)
    }catch(e){
      console.log(e)
    }
  } */
  /*usamos un operador ternario para que en el caso que de que no aya obtenido aun los datos de la 
  api se muestra un mensaje que dice cargando y si no le dibujamos los componentes y pasamos los 
  datos de la api como props */
  return (
    !coins ? "Cargando..." :(
    <div className='App'>
       <ThemeProvider>
       <Header currencys={currency} fun={setSelCur} cur={selCur}/>
       </ThemeProvider>
      <main>
      <CardPrincipal json={coins[0]} cur={selCur}/>
          <div className="cards_con">
          { coins.map(({id,symbol, image, current_price,price_change_percentage_30d_in_currency},index) =>{
            if(index != 0) {
             return <Card key={index} price={`${symbol} - ${current_price} ${selCur} `} porcentaje={deleteDec(price_change_percentage_30d_in_currency,2)} img={image} coinId={id} cur={selCur}/>
            }
          })
          }
        </div>
      </main>
      <Convert/>
      <TableCoins coins={coins}/>
        <Footer/>
    </div>
  )
  )

}
export function deleteDec(val, decimal) {
  return val.toFixed(decimal)
}
export function colorDec(num){
  return num > 0 ? "green" : "red"
}
export const numberF = Intl.NumberFormat("es-ES")
