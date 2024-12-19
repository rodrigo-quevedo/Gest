// recibe un objeto Date y lo parsea
function formatTime(d){

    var hours = d.getHours().toString()
    var minutes = d.getMinutes().toString()
    
    if (hours.length === 1) hours = '0'+ hours
    if (minutes.length === 1) minutes = '0'+ minutes

    return `${hours}:${minutes}`;

}


module.exports = formatTime