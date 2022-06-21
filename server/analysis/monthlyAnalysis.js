const {Item} = require("../models")
const {timeStampToMonthYear,dateObjectToMonthYear} = require("../utils/date");
const { groupItemsByProduct } = require("./analysisHelpers");

class MonthGrouping{
    constructor(month,year){
        this.month = month;
        this.year = year;
        this.items = [];
        this.products = {};
    }
}

const groupItemsByMonth = async (parent,{enterpriseId,sales})=>{
    const items = await Item.find({enterprise:enterpriseId});
    const results = [];
    items.forEach((item)=>{
        const date = sales?item.saleDate:item.purchaseDate
        if (date){
            const itemMonth = dateObjectToMonthYear(date);
            let monthObj = results.filter(obj=>{
                return (obj.month===itemMonth.month && obj.year === itemMonth.year)
            })?.[0];
            if(!monthObj){
                monthObj = new MonthGrouping(itemMonth.month,itemMonth.year);
                results.push(monthObj)
            }
            monthObj.items.push(item)
        }

    });
    console.log(results[0].items.length)
    for (let i = 0;i<results.length;i++){
        const grouping = await groupItemsByProduct(results[i].items);
        const res = {...results[i],products:grouping};
        results[i]=res
    }
    // results.forEach(async m=>{
    //     for (let prod in grouping){
    //         m.products[prod]=grouping[prod]
    //     }
    // })
    console.log(results)
    return results
}


module.exports = {groupItemsByMonth}