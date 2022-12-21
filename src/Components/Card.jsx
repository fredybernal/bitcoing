//importamos los estilos y los componentes que necesitamos 
import "../styles/Card.css"
import Graph from "./Graph"
import {colorDec} from '../App'/*traemos una funcion que sirve para cambiar cuando 
es positivo o negativo un numero */

export default function Card({coinId, cur, porcentaje, price, img}){/*se reciben unas props 
para poder llenar el componente con informacion */
    return (//se utilizan las props para formatear los textos 
        <div className="card">
            <img src={img} alt=""/>
            <div className="con-main">
                <div className="con-title">
                    <h2 className={`price ${colorDec(porcentaje)}`}>{price}</h2>
                    <h4 className={`porcentajes ${colorDec(porcentaje)}`}>{porcentaje}%</h4>
                </div>
                <Graph coin={coinId} currency={cur} color={colorDec(porcentaje)}/>
            </div>
        </div>
    )
}