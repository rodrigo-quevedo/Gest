// recibe un objeto Date y lo parsea
function formatDate(d){

    var year = d.getFullYear().toString();
    var month = (d.getMonth() + 1).toString();
    var day = d.getDate().toString();
    
    if (month.length === 1)  month = "0" + month;
    if (day.length === 1) day = "0" + day;

    return `${year}/${month}/${day}`;

}


module.exports = formatDate