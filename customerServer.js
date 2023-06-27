let express = require("express");
let app = express();
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
const port = process.env.PORT || 2410;
app.listen(port, ()=> console.log(`Node app listening on port ${port}`));
let {customersData} = require("./customersData.js");

app.get("/customers",function(req,res){
    let arr1 = customersData;
    let city = req.query.city;
    let gender = req.query.gender;
    let payment = req.query.payment;
    let sortBy = req.query.sortBy;
    if(city)
        arr1 = arr1.filter(a=>a.city===city);
    if(gender)
        arr1 = arr1.filter(a=>a.gender===gender);
    if(payment)
        arr1 = arr1.filter(a=>a.payment===payment);
    if(sortBy==="id")
        arr1.sort((a1,a2)=>a1.id.localeCompare(a2.id));
    if(sortBy==="name")
        arr1.sort((a1,a2)=>a1.name.localeCompare(a2.name));
    if(sortBy==="city")
        arr1.sort((a1,a2)=>a1.city.localeCompare(a2.city));
    if(sortBy==="age")
        arr1.sort((a1,a2)=>a1.age-a2.age);
    if(sortBy==="gender")
        arr1.sort((a1,a2)=>a1.gender.localeCompare(a2.gender));
    if(sortBy==="payment")
        arr1.sort((a1,a2)=>a1.payment.localeCompare(a2.payment));
    if(arr1.length>0)
        res.send(arr1);
    else
        res.status(404).send("Customer not found");
})

app.get("/customers/:id",function(req,res){
    let id = req.params.id;
    let customer = customersData.find(c=>c.id===id);
    res.send(customer);
})

app.post("/customers",function(req,res){
    let body = req.body;
    customersData.push(body);
    res.send(body);
})

app.put("/customers/:id",function(req,res){
    let id = req.params.id;
    let body = req.body;
    let index = customersData.findIndex(c=>c.id===id);
    if(index>=0){
        customersData[index]=body;
        res.send(body);
    }
    else{
        res.status(404).send("Customer not found");
    }
})

app.delete("/customers/:id",function(req,res){
    let id = req.params.id;
    let index = customersData.findIndex(c=>c.id===id);
    if(index>=0){
        let deletedCustomer = customersData.splice(index,1);
        res.send(deletedCustomer);
    }
    else{
        res.status(404).send("Customer not found");
    }
})
