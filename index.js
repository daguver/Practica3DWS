var http = require('http');
var url = require("url");
var fs = require("fs");
http.createServer(function(peticion,respuesta){
    var base = url.parse(peticion.url, true);
    var path = base.pathname;
    var params = base.query;
    if(path=="/dni"){
        fs.readFile("instrucciones.html",function(error,datos){
            if (error){
                respuesta.writeHead(404,  {'Content-Type':'text/plain;charset=utf-8'});
                return respuesta.end("404 Not Found");
            }  
            if(!params.num){
                console.log(params.num);
                respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8 ' });
                return respuesta.end(datos);
            }else{
                if(params.num.length==8 && !isNaN(params.num)){
                    let letras = "TRWAGMYFPDXBNJZSQVHLCKE"
                    var num = parseInt(params.num);
                    let resto = num%23;
                    respuesta.end(params.num+letras.slice(resto,resto+1));
                }else{
                    respuesta.writeHead(404,  {'Content-Type':'text/plain;charset=utf-8'});
                    respuesta.end("El número introducido no es válido, asegurese que tiene 8 cifras.");
                }
            }
        });
    }else if(path=="/escribir"){
        if (!fs.existsSync("./Copia")){
            fs.mkdirSync("./Copia");
        }
        fs.writeFile("./Copia/holaMundo.txt","David Guirado Vergara",function(err){
            if(err) throw err;
            console.log("Saved!")
        });
        respuesta.end("Guardado!");
    }else{
        respuesta.writeHead(404,  {'Content-Type':'text/plain;charset=utf-8'});
        respuesta.end("Escriba la acción ha realizar, dni o escribir")
    }
}).listen(8083,"127.0.0.3")