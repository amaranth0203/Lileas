var exec = require( "child_process" ).exec ;

function start( response ) {
  console.log( "Request handler 'start' was called." ) ;
  var content = "empty" ;

  exec( "find /" , 
    { timeout : 100 , maxBuffer : 20000*1024 } ,
    function ( error , stdout , stderr ) {
      response.writeHead( 200 , { "Content-Type" : "text/html" } ) ;
//      response.write( stdout ) ;
      response.write( "<a href='/essay'>essay</a>" +
                      "<br/>" +
                      "<a href='/completion'>completion</a>" ) ;
      response.end( ) ;
    });

  return content ;
}
function upload( response ) {
  console.log( "Request handler 'upload' was called. " ) ;
  response.writeHead( 200 , { "Content-Type" : "text/plain" } ) ;
  response.write( "Hello Upload" ) ;
  response.end( ) ;
}
function essay( response ) {
  console.log( "Request handler 'start' was called." ) ;
  var content = "empty" ;

  exec( "cat essay.txt" , 
    { timeout : 100 , maxBuffer : 20000*1024 } ,
    function ( error , stdout , stderr ) {
      response.writeHead( 200 , { "Content-Type" : "text/plain" } ) ;
      response.write( "<a href='/completion'>completion</a>" +
                      stdout +
                      "<a href='/completion'>completion</a>" ) ;
      response.end( ) ;
    });

  return content ;
}
function completion( response ) {
  console.log( "Request handler 'start' was called." ) ;
  var content = "empty" ;

  exec( "cat completion.txt" , 
    { timeout : 100 , maxBuffer : 20000*1024 } ,
    function ( error , stdout , stderr ) {
      response.writeHead( 200 , { "Content-Type" : "text/plain" } ) ;
      response.write( "<a href='/essay'>essay</a>" + 
                      stdout +
                      "<a href='/essay'>essay</a>" ) ;
      response.end( ) ;
    });

  return content ;
}

exports.start = start ;
exports.upload = upload ;
exports.essay = essay ;
exports.completion = completion ;
