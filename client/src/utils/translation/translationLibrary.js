export const translations = {
    productName:"Product",
    units:"Units",
    binLocation:"Bin",
    totalCost:"Total Cost",
    costPerUnit:"Cost/Unit",
    sku:"SKU",
    totalSales:"Total Sales",
    salePerUnit:"Sales Price/Unit",
    __typename:"",
    name:"Product Name",
    description:"Description",
    msrp:"MSRP",
    category:"Category",
    numberPurchased:"# Purchased",
    numberIncoming:"# Incoming",
    numberInStock:"# in Stock",
    numberOutgoing:"# Outgoing",
    numberSold:"# Sold",
    numberFulfilled:"# Fulfilled",
    totalSalesRevenue:"Sales Revenue",
    averageSalesPrice:"Sales Price/Unit",
    averageCost:"Cost/Unit",
    monthText:"Month",
    0:"Jan",
    1:"Feb",
    2:"Mar",
    3:"Apr",
    4:"May",
    5:"Jun",
    6:"Jul",
    7:"Aug",
    8:"Sep",
    9:"Oct",
    10:"Nov",
    11:"Dec",
    year:"Year",
    totalIncome:"Total Income",
    startingStock:"Start Stock",
    endingStock:"End Stock",
    notes:"Notes",
    "__typename":" "
}

const converters = []

class Converter{
    constructor(name,conversionFunction){
        this.name = name
        this.properties = []
        this.conversionFunction = conversionFunction
        converters.push(this)
    }
    addProperty(property){
        this.properties.push(property)
    }
    convertValue(property,value){
        if(!this.properties.includes(property)||(typeof value !== "number")){
            return value
        }
            return this.conversionFunction(value)
    }
}

const decimalDollars = new Converter("decimalDollars",(value)=>`$${separator(value.toFixed(2))}`)
decimalDollars.addProperty("costPerUnit")
decimalDollars.addProperty("averageSalesPrice")
decimalDollars.addProperty("averageCost")

const wholeDollars = new Converter("wholeDollars",(value)=>`$${separator(Math.round(value))}`)
wholeDollars.addProperty("totalIncome")
wholeDollars.addProperty("totalCost")
wholeDollars.addProperty("totalSalesRevenue")

export const conversions = converters

function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}