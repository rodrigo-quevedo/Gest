import {useEffect} from 'react'

import Chart from 'chart.js/auto'

function useCrearGraficos(idCanvas, arrayData, marcaSelected, label){

    //arrayData:
    // ->fechaHora
        //obtener primera fecha
        let arrFechaHora = arrayData.map(x=>new Date(x.fechaHora))
        arrFechaHora.sort((a,b)=>{
            if (a < b) return -1
            else return 0
        })

        // ->completar con todas las fechas
        let arrTodasLasFechas = [];



    // ->cantidad
    let arrCantidades = arrayData.map(x=>x.cantidad)

    useEffect(()=>{
        if (!marcaSelected) return;

        new Chart(document.getElementById(idCanvas), {
            type: 'bar',
            data: {
                labels: arrFechaHora.map(x=>x.toLocaleString('es-US', {month: 'short', day: 'numeric', year: 'numeric'})),
                datasets: [
                    {
                        label: label,
                        data: arrCantidades
                    }
                ]
            }
        })
    }, [marcaSelected])
}


export default useCrearGraficos