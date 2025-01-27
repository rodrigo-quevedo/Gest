import {useEffect} from 'react'

import Chart from 'chart.js/auto'

function useCrearGraficosDiario(idCanvas, arrayData, marcaSelected, label){

    useEffect(()=>{
        if (!marcaSelected) return;

        // console.log('arrayData:', arrayData)

            //arrayData: Es un array de las compras/ventas de un producto de una marca
    // ->fechaHora
        //obtener primera fecha
        let arrFechahoraCantidad = arrayData.map(x=>{
            return ({
                //devolver solo Date (sin Time)
                fechaHora : new Date(x.fechaHora).toDateString(),
                cantidad : x.cantidad
            })
        })

        // console.log('arrFechahoraCantidad',arrFechahoraCantidad)

        //juntar cantidades de las mismas fechas
        let arrFechahoraCantidadSinRepetir = [];

        let arrFechahora = arrFechahoraCantidad.map(x=>x.fechaHora)
        let arrFechahoraSinrepetir = []
        arrFechahoraCantidad.forEach((obj, index)=>{
            if (arrFechahora.indexOf(obj.fechaHora) === index) {
                // console.log('nuevo: ', obj)
                arrFechahoraCantidadSinRepetir.push(obj)
                arrFechahoraSinrepetir.push(obj.fechaHora)
                // console.log('arr sin repetir:',arrFechahoraCantidadSinRepetir)
            }
            else {
                arrFechahoraCantidadSinRepetir[arrFechahoraSinrepetir.indexOf(obj.fechaHora)].cantidad += obj.cantidad
                // console.log('repetido:', obj)
            }
        })
        // console.log('arrFechahoraCantidadSinRepetir',arrFechahoraCantidadSinRepetir)

        //ordenar por fecha
        arrFechahoraCantidadSinRepetir.sort((a,b)=>{
            if (new Date(a.fechaHora) < new Date(b.fechaHora)) return -1
            else return 0
        })
        let primeraFecha = new Date(arrFechahoraCantidadSinRepetir[0].fechaHora)
        // let ultimaFecha = new Date(arrFechahoraCantidadSinRepetir[arrFechahoraCantidadSinRepetir.length-1].fechaHora)
        // console.log(primeraFecha)
        // console.log(ultimaFecha)


        // ->completar con todas las fechas
        
        let arrBusqueda = arrFechahoraCantidadSinRepetir.map(x=>x.fechaHora)//tienen mismo index, por eso sirve para buscar strings

        let arrCompleto = [];

        let fechaPointer = new Date(primeraFecha)
        let hoy = new Date()
        // while(fechaPointer <= ultimaFecha){
        while(fechaPointer <= hoy){
            let indexEncontrado = arrBusqueda.indexOf(fechaPointer.toDateString())
            if (indexEncontrado !== -1){
                arrCompleto.push(arrFechahoraCantidadSinRepetir[indexEncontrado])
            }
            else {
                arrCompleto.push({
                    fechaHora: fechaPointer.toDateString(),
                    cantidad: 0
                })
            }
            fechaPointer.setDate(fechaPointer.getDate() + 1)
        }

        // console.log(arrCompleto)

        new Chart(document.getElementById(idCanvas), {
            type: 'bar',
            data: {
                labels: arrCompleto.map(x=>new Date(x.fechaHora).toLocaleString('es-US', {month: 'short', day: 'numeric', year: 'numeric'})),
                datasets: [
                    {
                        label: label,
                        data: arrCompleto.map(x=>x.cantidad),
                        backgroundColor: '#f00'
                    }
                ]
            }
        })
    }, [marcaSelected])
}


export default useCrearGraficosDiario