const http = require("http");
const fs = require("fs")
const renderHTML = (path, res)=>{
    fs.readFile(path,(err,data)=>{
            if(err){
                read.writeHead(404);
                res.write('Error : page not found');
            } else {
                res.write(data)
            }
            res.end();
        })
    }

    
http
  .createServer((req, res) => {
    const url=req.url;
    console.log(url);

    res.writeHead(200, { "Content-Type": "text/html" });
        if(url==='/about'){
        //res.write('<h1>this about page</h1>'); //using html language
        //res.end();
        //fs.readFile('./about.html',(error,data)=>{
        //     if(error){
        //         read.writeHead(404);
        //         res.write('Error : page not found');
        //     } else {
        //         res.write(data)
        //     }
        //     res.end();
        // })
        renderHTML('./about.html',res);
    
    } else if(url==='/contact'){
       // res.write('<h1>this is contact page</h1>'); //using html language
       // res.end();
    //    fs.readFile('./contact.html',(error,data)=>{
    //         if(error){
    //             read.writeHead(404);
    //             res.write('Error : page not found');
    //         } else {
    //             res.write(data)
    //         }
    //         res.end();
    //     })
        renderHTML('./contact.html',res);

    } else{
        //res.write("Hello, World!");
        // fs.readFile('./index.html',(error,data)=>{
        //     if(error){
        //         read.writeHead(404);
        //         res.write('Error : page not found');
        //     } else {
        //         res.write(data)
        //     }
        //     res.end();
        // })}
        renderHTML('./index.html',res);
    }})

  .listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });