

const getItemsByOrderNumber = async (orderNumber)=>{
    const items = await Items.find({orderNumber})
    console.log(items);
    
}