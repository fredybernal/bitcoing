//importamos los estilos los componentes nesesarios y las librerias 
import "../styles/Graph.css"
import {useEffect, useState, useRef} from 'react'//useRef nos sirve para obtener una referencia de una elemento html sin tener id 
import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';/*importamos chart js y los plugins necesarios para dibujar el grafico*/
import moment from "moment/moment";//moment nos sirve para formatear fechas en formato unix

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
)//registramos los plugins que vamos a usar en nuestro grafico 
export default function Graph({type = 1, coin = "bitcoin", currency = "usd", days = 30,color = "#04D99D"}){/*
resibimos cuatro props pero todas son opcionales */
    const chartStyle = {
        border: {
            display: false
        },
        grid:{
            display: false,  
        },
        ticks: {
            display: false
        }
    }//usamos unos estios para darle a los graficos 
    let url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
    let data , options//son dos variables que nos sirbe parqa cambiar el grafico que se usa dependiendo la prop que se le pase 
    const [prices, setPrices] = useState()/*guarda los precios que optiene la api */
    const [dates, setDates] = useState()//guarda las fechas que optiene la api 
    const [gradient, setGradient] = useState()//guardamos el gradiente que va de fondo en el grafico 
    async function getData(){//obtenemos los datos de la api 
        try{/*usamos try catch en caso de  aver un error lo capturamos */
            const response = await fetch(url)
            const json = await response.json()
            setPrices(json.prices.map(item => Math.round(item[1])))/*con el metodo map generamos un 
            nuevo areglo con los precios redondeados */
            setDates(json.prices.map(item => moment.unix(item[0]).format("MM-DD")))/*con el map 
            generamos un arreglo con las fechas formateadas con moment */
        }catch(e){
            console.log("error:",e)
        }
    }
    const chartRef = useRef(null);//creamos la referencia 
    
    useEffect(_ => {
        getData()
        /*obtenemos lo datos de la api cuando renderisa el coponente */
        const canvas = chartRef.current.firstChild/*usando la referencia obtenemos el canvas */
        let BGgradient = canvas.getContext("2d").createLinearGradient(0, 0, 0, canvas.height);
        BGgradient.addColorStop(0, 'rgba(4, 191, 157, 1)');   
        BGgradient.addColorStop(1, 'rgba(4, 191, 157, 0)')
        setGradient(BGgradient)//creamos el gradiente y lo guardamos en el estado 
    },[])
    
    
    
    switch(type){//comparamos el tipo de grafico y dependiendo dibujamos uno que tiene fondo o uno sin fondo 
        case 0:

            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  }
                },
                scales: {
                    x:{
                        grid:{
                            display: false
                        }
                    },
                    y:{
                        grid:{
                            display: false
                        },
                        ticks: {
                            callback: function(value, index, ticks) {
                                return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${currency.toUpperCase()}`;
                            }
                        }
                    }
                }
              }
            data = {
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    backgroundColor: gradient,
                    tension: .4,
                    pointRadius: 0,
                    fill: true
                  }
                ]
              }
              break
        case 1:
            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  }
                },
                scales: {
                    x: chartStyle,
                    y: chartStyle
                }
              }
            data = {
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    tension: .4,
                    pointRadius: 0,
                  }
                ]
              }
            break
    }
    return (//renderisamos el grafico 
        <div ref={chartRef} className="graph">{/*obtenemos la referencia del div */}
            <Line data={data} options={options}/>
        </div> 
    )
}