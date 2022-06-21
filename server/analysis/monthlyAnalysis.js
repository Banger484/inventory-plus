const {Item} = require("../models")
const {timeStampToMonthYear,dateObjectToMonthYear} = require("../utils/date");
const { groupItemsByProduct } = require("./analysisHelpers");

class MonthGrouping{
    constructor(month,year){
        this.month = month;
        this.year = year;
        this.itemsPurchased = [];
        this.itemsSold = []
        this.products = {};
        this.numberPurchased = 0;
        this.numberSold = 0;
        this.totalCost = 0;
        this.totalIncome = 0;
    }
    calcBuys(){
        this.itemsPurchased.forEach(i=>{
            this.numberPurchased++;
            this.totalCost+=i.cost;
        })
    }
    calcSales(){
        this.itemsSold.forEach(i=>{
            this.numberSold++;
            this.totalIncome+=i.salesPrice
        })
    }

}

const groupItemsByMonth = async (parent,{enterpriseId,productId})=>{
    try{
        let items;
        if(productId){
            items = await Item.find({enterprise:enterpriseId,product:productId});
        }else{
            items = await Item.find({enterprise:enterpriseId});
        }
        const results = [];
        items.forEach((item)=>{
            const date = item.purchaseDate
            if (date){
            const itemMonth = dateObjectToMonthYear(date);
            let monthObj = results.filter(obj=>{
                return (obj.month===itemMonth.month && obj.year === itemMonth.year)
            })?.[0];
            if(!monthObj){
                monthObj = new MonthGrouping(itemMonth.month,itemMonth.year);
                results.push(monthObj)
            }
            monthObj.itemsPurchased.push(item)
        }

    });
    items.forEach((item)=>{
        const date = item.saleDate
        if (date){
            const itemMonth = dateObjectToMonthYear(date);
            let monthObj = results.filter(obj=>{
                return (obj.month===itemMonth.month && obj.year === itemMonth.year)
            })?.[0];
            if(!monthObj){
                monthObj = new MonthGrouping(itemMonth.month,itemMonth.year);
                results.push(monthObj)
            }
            monthObj.itemsSold.push(item)
        }

    });
    results.forEach(month=>{
        month.calcBuys();
        month.calcSales()
    })
    const parsedResults = [];
    results.forEach(({month,year,numberPurchased,numberSold,totalCost,totalIncome})=>{
        const el = {month,year,numberPurchased,numberSold,totalCost:Math.round(totalCost),totalIncome:Math.round(totalIncome)};
        parsedResults.push(el)
    })
    console.log(parsedResults)
    return results
}catch(err){
    console.error(err)
}
}

module.exports = {groupItemsByMonth}