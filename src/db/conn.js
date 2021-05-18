const mongoose = require ("mongoose");

mongoose.connect("mongodb+srv://aritro:aritro@cluster0.7l5by.mongodb.net/myrecords" , {
    useNewUrlParser:true,
    useUnifiedTopology:true,                           
    useCreateIndex:true
}).then(() => {
    console.log('connection successful');
}).catch((e) => {
    console.log('no connection');
})