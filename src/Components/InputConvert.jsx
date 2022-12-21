//importamos los estilos  y los componentes necesarios 
import React, {useState, useRef} from "react";
import "../styles/Convert.css";
import {deleteDec} from '../App'

export default function InputConvert({ coin,  sel = "btc", fun, other,text, type = 1, result = 0}) {/*recibimos 
unas props que son opcionales */
  const selRef = useRef(null)//creamos nuestra refercia del select 
  const [selVal, setSelVal] = useState(sel)//guardamos la moneda seleccionada 

  return (
    <>
      <div className="input">
        {(type === 0) ? <input type="number" placeholder="0" onChange={e => {text(parseFloat(e.target.value))}}/>
        : <input type="number" placeholder="0" value={deleteDec(result, 4)} readOnly={true}/>}{/*si el tipo es zero
        dibujamos un formulario editable el cual le asigna su valor a un estado del padre si no dibujamos un 
        formulario de solo lectura donde mostraremos el resultado de la convercion */}
        
        <div className="select">
          <img src="" alt="" />
          <select value={selVal} ref={selRef} onChange={() => {{/*cambiamos e estado del padre al de la 
          moneda selecciona actualmente */}
              setSelVal(selRef.current.value)
              fun(selRef.current.value)
            }}>
            {coin.map((co) => {/*dibujamos cada una de las opciones del select traidas de la api */
              if(co.symbol === selVal){
                selRef.current.previousSibling.src = co.image
                return <option value={co.symbol} key={co.id}>{co.symbol}</option>
              }else if(co.symbol != other){
                return <option value={co.symbol} key={co.id}>{co.name}</option>
              }
              /* if(index === sel){
              return <option selected value={co.symbol} key={co.id}>{co.symbol}</option>
              }else{
              return <option value={co.symbol} key={co.id}>{co.name}</option>
              }
              } */
            })}
          </select>
        </div>
      </div>
    </>
  );
}
