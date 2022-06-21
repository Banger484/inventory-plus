


const timeStampToMonthYear = (timestamp)=>{
    console.log(timestamp)
    timestamp = parseInt(timestamp)
    const date = new Date(timestamp)
    const obj = {};
    obj.month = date.getMonth();
    obj.year = date.getFullYear();
    return obj
}

const dateObjectToMonthYear = (date)=>{
    const obj = {};
    obj.month = date.getMonth();
    obj.year = date.getFullYear();
    return obj
}

module.exports = {timeStampToMonthYear,dateObjectToMonthYear}