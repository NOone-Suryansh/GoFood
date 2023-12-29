const mongoos=require('mongoose')

const mongoURI="mongodb://127.0.0.1:27017/gofood";

const connectToMongo= async()=>{
    await mongoos.connect(mongoURI);
    console.log("connected");
    const feched_data=await mongoos.connection.db.collection("food");
    const data=await feched_data.find({}).toArray();
    global.food_items=data;
    // console.log(global.food_items);
    const foodCategory=await mongoos.connection.db.collection("category");
    const cat=await foodCategory.find({}).toArray();
    global.food_cat=cat;
}


module.exports=connectToMongo;