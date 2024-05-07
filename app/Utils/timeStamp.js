function pad(n) {return n<10 ? "0"+n : n}
const timeStamp = function (){
    d=new Date()
    dash="-"
    colon=":"
    return d.getFullYear()+dash+
    pad(d.getMonth()+1)+dash+
    pad(d.getDate())+" "+
    pad(d.getHours())+colon+
    pad(d.getMinutes())+colon+
    pad(d.getSeconds())
}

module.exports = { timeStamp }