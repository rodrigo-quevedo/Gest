import {useEffect} from 'react'

import Chart from 'chart.js/auto'

function useCrearGraficosFinanza(idCanvas, arrayData, marcaSelected, label, general){

    useEffect(()=>{
        if (!marcaSelected) return;

        console.log('arrayData:', arrayData)
        // arrData : {totalGastado, totalVendido, totalGanancia, totalMargen}
        let arrLabels = ['Gastado', 'Vendido', 'Neto', 'Ganancia']
        let arrData;
        if (general){
            arrData = [(Number(arrayData[0].totalGastado) * -1), arrayData[0].totalVendido, arrayData[0].totalGanancia, arrayData[0].totalMargen]
        }
        else {
            arrData = [(Number(arrayData[0].totalGastadoProducto) * -1), arrayData[0].totalVendidoProducto, arrayData[0].totalGananciaProducto, arrayData[0].totalMargenProducto] 
        }

        //obtener maximo (esto es para que el grafico sea simetrico)
        let maximo = ((arrData[0] * -1) > arrData[1]) ? (arrData[0] * -1) : arrData[1] 
        let minimo = maximo * -1

        //---> Todo esto es para poder usar diferentes colores en el grafico
            //gastos
            let arrGastos = [
                arrData[0], 
                0, 
                (arrData[2] < 0) ? arrData[2] : 0,
                (arrData[3] < 0) ? arrData[3] : 0
            ]

            //ventas
            let arrVentas = [
                0, 
                arrData[1], 
                (arrData[2] > 0) ? arrData[2] : 0, 
                (arrData[3] > 0) ? arrData[3] : 0
            ]

        //

        new Chart(document.getElementById(idCanvas), {
            type: 'bar',
            data: {
                labels: arrLabels,
                datasets: [
                    {
                        label: label,
                        data: arrGastos,
                        backgroundColor: '#C00000'
                    },
                    {
                        label: label,
                        data: arrVentas,
                        backgroundColor: '#046A3E'
                    },
                ]
            },
            options: {
                scales: {
                    y: {
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function(value, index, ticks) {
                                return '$' + value;
                            }
                        },
                        max: maximo,
                        min: minimo,
                        grid: {
                            lineWidth: ({ tick }) => tick.value == 0 ? 1 : 0.2,
                            color: '#000'
                        }
                    },
                    x: {
                        ticks: {
                            autoSkip: false,
                            maxRotation: 0,
                            minRotation: 0
                        }
                    }
                    
                },
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }
        })
    }, [marcaSelected])
}


export default useCrearGraficosFinanza