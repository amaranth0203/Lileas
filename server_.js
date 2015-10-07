var express = require('express');   //Express Web Server 
var bodyParser = require('body-parser'); //connects bodyParsing middleware
var formidable = require('formidable');
var path = require('path');     //used for file path
var fse =require('fs-extra');    //File System-needed for renaming file etc
var fs = require('fs') ;


var app = express();
app.use(express.static(path.join(__dirname, 'public')));
/* ========================================================== 
 bodyParser() required to allow Express to see the uploaded files
============================================================ */
app.use(bodyParser({defer: true}));


app.get('/test', function(req, res, next) {
    res.writeHead(200,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"http://localhost"});
    var otherArray = ["item1", "item2"];
    var otherObject = { item1: "item1val", item2: "item2val" };
    var json = JSON.stringify({ 
        anObject: otherObject, 
        anArray: otherArray, 
        another: "item"
    });
    // res.write( json ) ;
    // res.end( );
    fs.readFile( './img/test.raw' , function( err , data ) {
        if( err ) throw err ;
        res.write( data ) ;
        res.end( ) ;
    }) ;
});

app.route('/upload').post(function (req, res, next) {

    var form = new formidable.IncomingForm();
    //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./img";       //set upload directory
    form.keepExtensions = true;     //keep file extension

    form.parse(req, function(err, fields, files) {
        console.log("form.bytesReceived");
        //TESTING
        console.log("file size: "+JSON.stringify(files.fileUploaded.size));
        console.log("file path: "+JSON.stringify(files.fileUploaded.path));
        console.log("file name: "+JSON.stringify(files.fileUploaded.name));
        console.log("file type: "+JSON.stringify(files.fileUploaded.type));
        console.log("astModifiedDate: "+JSON.stringify(files.fileUploaded.lastModifiedDate));

        //Formidable changes the name of the uploaded file
        //Rename the file to its original name
        fse.rename(files.fileUploaded.path, './img/'+files.fileUploaded.name, function(err) {
            if (err) throw err;
            console.log('renamed complete');  
        });

        // res.writeHead(200, {'content-type': 'text/plain'});
        // res.write('received upload:\n\n');
        // res.end();

        res.writeHead(200, {'content-type': 'image/jpeg'});
        fs.readFile( './img/'+files.fileUploaded.name , function( err , data ) {
            if( err ) throw err ;
            res.write( data ) ;
            res.end( ) ;
        }) ;
        // fs.open('./img/'+files.fileUploaded.name, 'r', function(status, fd) {
            // if (status) {
                // console.log(status.message);
                // return;
            // }
            // var buffer = new Buffer(100);
            // fs.read(fd, buffer, 0, 100, 0, function(err, num) {
                // res.end( buffer ) ;
            // });
        // });

    });
});
var server = app.listen(3031, function() {
    console.log('Listening on port %d', server.address().port);
});