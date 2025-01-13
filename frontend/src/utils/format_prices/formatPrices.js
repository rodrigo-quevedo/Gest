
// Para mayor legibilidad del precio, lo formatea con comas y 2 decimales.
function formatPrice(price){
    return (
        new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2, maximumFractionDigits: 2
        }).format(price)
    )
}

export default formatPrice