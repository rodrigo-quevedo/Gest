function formatDate(d){

    var year = d.getFullYear().toString();
    var month = (d.getMonth() + 1).toString();
    var day = d.getDate().toString();
    var hours = d.getHours().toString()
    var minutes = d.getMinutes().toString()
    
    if (month.length === 1)  month = "0" + month;
    if (day.length === 1) day = "0" + day;
    if (hours.length === 1) hours = '0'+ hours
    if (minutes.length === 1) minutes = '0'+ minutes

    return `${year}-${month}-${day} a las ${hours}:${minutes}`;

}


module.exports = formatDate