var server = require( "./server" ) ;
var router = require( "./router" ) ;
var requestHandlers = require( "./requestHandlers" ) ;

var handle = {} ;
handle[ "/" ] = requestHandlers.start ;
handle[ "/start" ] = requestHandlers.start ;
handle[ "/upload" ] = requestHandlers.upload ;
handle[ "/essay" ] = requestHandlers.essay ;
handle[ "/completion" ] = requestHandlers.completion ;

server.start( router.route , handle ) ;
