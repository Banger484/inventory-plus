
const groupItems = (data)=>{
    const array = [];
    data.forEach(item=>{
        const matches = array.filter(el=>el.id==item.product._id)
        if(matches.length===0){
            array.push({id:item.product._id,quantity:1,name:item.product.name,sku:item.product.sku,msrp:item.product.msrp,totalMSRP:item.product.msrp,totalCost:item.cost,averageCost:item.cost,totalSalesPrice:item.salesPrice||"not sold",averageSalesPrice:item.salesPrice||"not sold",bins:[item.binLocation]})
        }
        else{
            matches[0].quantity++
            matches[0].totalMSRP+=matches[0].msrp
            matches[0].totalCost+=item.cost;
            matches[0].totalSalesPrice==="not sold"||(matches[0].totalSalesPrice+=item.salesPrice);
            matches[0].averageCost=matches[0].totalCost/matches[0].quantity
            matches[0].averageSalesPrice=matches[0].totalSalesPrice/matches[0].quantity||"not sold";
            matches[0].bins.push(item.binLocation)
            matches[0].bins = [...new Set(matches[0].bins)]
        }
    })
    return array
}

const testCurrentItems = [
    {
        "__typename": "Item",
        "_id": "6296a255dbeac327b8a9a7f9",
        "product": {
            "__typename": "Product",
            "_id": "6296a255dbeac327b8a9a7ee",
            "sku": "ABC123",
            "name": "New Hampshire End Table",
            "description": "Solid Oak with glass inset. Victorian Style",
            "msrp": 150,
            "category": "tables",
            "notes": "No assembly required"
        },
        "orderNumber": 1,
        "cost": 60,
        "purchaseDate": "1653973200000",
        "supplier": "Dev Manu Inc.",
        "receivedDate": "1656824400000",
        "binLocation": "J33"
    },
    {
        "__typename": "Item",
        "_id": "6296a255dbeac327b8a9a807",
        "product": {
            "__typename": "Product",
            "_id": "6296a255dbeac327b8a9a7ef",
            "sku": "CFI395",
            "name": "Prairie Dining",
            "description": "Mahogany, Prairie Style",
            "msrp": 900,
            "category": "tables",
            "notes": "Two Leafs included"
        },
        "orderNumber": 1,
        "cost": 400,
        "purchaseDate": "1653973200000",
        "supplier": "AFG LTD.",
        "receivedDate": "1656824400000",
        "binLocation": "J33"
    },
    {
        "__typename": "Item",
        "_id": "6296a255dbeac327b8a9a809",
        "product": {
            "__typename": "Product",
            "_id": "6296a255dbeac327b8a9a7ef",
            "sku": "CFI395",
            "name": "Prairie Dining",
            "description": "Mahogany, Prairie Style",
            "msrp": 900,
            "category": "tables",
            "notes": "Two Leafs included"
        },
        "orderNumber": 1,
        "cost": 400,
        "purchaseDate": "1653973200000",
        "supplier": "AFG LTD.",
        "receivedDate": "1656824400000",
        "binLocation": "J33"
    }
]

const testIncomingItems = [
      {
        "_id": "6296a255dbeac327b8a9a817",
        "product": {
          "_id": "6296a255dbeac327b8a9a7f0",
          "sku": "IEN830",
          "name": "Elkwood Davenport",
          "description": "Plush sofa with metal rivets, seats three",
          "msrp": 1500,
          "category": "sofas",
          "notes": "No assembly required"
        },
        "orderNumber": 2,
        "saleNumber": null,
        "cost": 900,
        "purchaseDate": "1655269200000",
        "supplier": "Dev Manu Inc.",
        "receivedDate": null,
        "binLocation": null,
        "buyer": null,
        "salesPrice": null,
        "saleDate": null,
        "fulfillmentDate": null
      },
      {
        "_id": "6296a255dbeac327b8a9a819",
        "product": {
          "_id": "6296a255dbeac327b8a9a7f0",
          "sku": "IEN830",
          "name": "Elkwood Davenport",
          "description": "Plush sofa with metal rivets, seats three",
          "msrp": 1500,
          "category": "sofas",
          "notes": "No assembly required"
        },
        "orderNumber": 2,
        "saleNumber": null,
        "cost": 900,
        "purchaseDate": "1655269200000",
        "supplier": "Dev Manu Inc.",
        "receivedDate": null,
        "binLocation": null,
        "buyer": null,
        "salesPrice": null,
        "saleDate": null,
        "fulfillmentDate": null
      },
      {
        "_id": "6296a255dbeac327b8a9a822",
        "product": {
          "_id": "6296a255dbeac327b8a9a7f1",
          "sku": "FEE980",
          "name": "Visage Lamp",
          "description": "Art Deco floor lamp",
          "msrp": 150,
          "category": "lamps",
          "notes": "Some assembly required, fragile"
        },
        "orderNumber": 3,
        "saleNumber": null,
        "cost": 65,
        "purchaseDate": "1656997200000",
        "supplier": "Emory",
        "receivedDate": null,
        "binLocation": null,
        "buyer": null,
        "salesPrice": null,
        "saleDate": null,
        "fulfillmentDate": null
      },
      {
        "_id": "6296a255dbeac327b8a9a824",
        "product": {
          "_id": "6296a255dbeac327b8a9a7f1",
          "sku": "FEE980",
          "name": "Visage Lamp",
          "description": "Art Deco floor lamp",
          "msrp": 150,
          "category": "lamps",
          "notes": "Some assembly required, fragile"
        },
        "orderNumber": 3,
        "saleNumber": null,
        "cost": 65,
        "purchaseDate": "1656997200000",
        "supplier": "Emory",
        "receivedDate": null,
        "binLocation": null,
        "buyer": null,
        "salesPrice": null,
        "saleDate": null,
        "fulfillmentDate": null
      }
    ]

const currentGroup = groupItems(testCurrentItems)

const incomingGroup = groupItems(testIncomingItems)

const testOrderGuide = [
    {
      "_id": "6296a255dbeac327b8a9a7ee",
      "sku": "ABC123",
      "name": "New Hampshire End Table",
      "description": "Solid Oak with glass inset. Victorian Style",
      "msrp": 150,
      "category": "tables",
      "notes": "No assembly required"
    },
    {
      "_id": "6296a255dbeac327b8a9a7ef",
      "sku": "CFI395",
      "name": "Prairie Dining",
      "description": "Mahogany, Prairie Style",
      "msrp": 900,
      "category": "tables",
      "notes": "Two Leafs included"
    },
    {
      "_id": "6296a255dbeac327b8a9a7f0",
      "sku": "IEN830",
      "name": "Elkwood Davenport",
      "description": "Plush sofa with metal rivets, seats three",
      "msrp": 1500,
      "category": "sofas",
      "notes": "No assembly required"
    },
    {
      "_id": "6296a255dbeac327b8a9a7f1",
      "sku": "FEE980",
      "name": "Visage Lamp",
      "description": "Art Deco floor lamp",
      "msrp": 150,
      "category": "lamps",
      "notes": "Some assembly required, fragile"
    },
    {
      "_id": "6296b791a5cee5bfce4b6770",
      "sku": "334KKA",
      "name": "Gandy Shelf",
      "description": "Six Foot high balsa shelf",
      "msrp": 25,
      "category": "shelves",
      "notes": "cheaply made, very fragile"
    },
    {
      "_id": "6296b7e8a5cee5bfce4b6775",
      "sku": "ERI333",
      "name": "Royale Bed",
      "description": "California King Bed with Frame",
      "msrp": 4000,
      "category": "beds",
      "notes": ""
    }
  ]


const generatePurchaseTableData = (guide,current,incoming)=>{
    const array = []
    guide.forEach(product=>{
        let obj;
        const currentMatch = current.filter(el=>el.id===product._id) 
        const incomingMatch = incoming.filter(el=>el.id===product._id) 
        obj= {...product,current:(currentMatch[0]?.quantity||0),incoming:(incomingMatch[0]?.quantity||0),newOrderQty:0,newOrderCostPerUnit:0}
        array.push(obj)
    })
    console.log(array)
    return array
}

const checkIfInList = (product,list)=>{
    const match = list.filter(li=>{
        return li._id===product._id
    })
    if (match.length!==0){
        return true
    }
    else{
        return false
    }
}



// generatePurchaseTableData(testOrderGuide,currentGroup,incomingGroup)

module.exports = {generatePurchaseTableData}