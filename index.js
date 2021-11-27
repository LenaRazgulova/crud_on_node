const http = require("http");
    crud = require("./crud");

const student = (req,res)=>{
    res.writeHead(200,{"Content-type":"application/json"})
    const url = req.url.substring(1).split("/");
    switch(req.method){
        case "GET":
            if (url.length>1)
                res.end(JSON.stringify(crud.get(url[1])));
            else
                res.end(JSON.stringify(crud.getAll()));
            break;
        case "POST":
            getAsyncData(req, data=>{
                res.end(JSON.stringify(crud.create(JSON.parse(data))));
            });
            break;
        case "PUT":
            getAsyncData(req, data=> {
                res.end(JSON.stringify(crud.update(JSON.parse(data))));
            });
            break;
        case "DELETE":
            if (url.length>1)
                res.end(JSON.stringify(crud.delete(url[1])));
            else
                res.end(JSON.stringify({error:"Не передан id"}));
            break;
    }
}
const getAsyncData =(req,callback)=>{
    let data = "";
    req.on("data", chunk=>{data+=chunk;});
    req.on("end", ()=>{callback(data);});
}
const handler = function(req, res){
    const url = req.url.substring(1).split("/");
    switch(url[0]){
        case "student":
            student(req,res);
            return;
        case "":
            res.end("index");
            return;

    }
    console.log("AFTER SWITCH");
    console.log(req.url);
    console.log(req.method);
    res.end("echo");
}
http.createServer(handler).listen(8091,()=>{
    console.log("run");
})