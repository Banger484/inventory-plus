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

const productAverages = async (parent,{enterpriseId,productId})=>{
    const months = await groupItemsByMonth(null,{enterpriseId,productId});
    const num = months.length
    const totals = months.reduce((a,b)=>{
        a.numberPurchased+=b.numberPurchased
        a.numberSold+=b.numberSold
        a.totalCost+=b.totalCost
        a.totalIncome+=b.totalIncome
        return a
    },{numberPurchased:0,numberSold:0,totalCost:0,totalIncome:0})
    const table = [{
        period:"Monthly",
        numberPurchased:totals.numberPurchased/num,
        numberSold:totals.numberSold/num,
        totalCost:totals.totalCost/num,
        totalIncome:totals.totalIncome/num
    },{
        period:"Quarterly",
        numberPurchased:totals.numberPurchased/num*3,
        numberSold:totals.numberSold/num*3,
        totalCost:totals.totalCost/num*3,
        totalIncome:totals.totalIncome/num*3
    },{
        period:"Annually",
        numberPurchased:totals.numberPurchased/num*12,
        numberSold:totals.numberSold/num*12,
        totalCost:totals.totalCost/num*12,
        totalIncome:totals.totalIncome/num*12
    }]
    table.forEach(row=>{
        for(let p in row){
            (typeof row[p]==="number")&& (row[p] = Math.round(row[p]))
        }
    })
    console.log(table)
    return table
}




module.exports = {groupItemsByMonth,productAverages}