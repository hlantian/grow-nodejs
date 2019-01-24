const net = require('net');
const listenPort = 8080;
const fs = require('fs');
let server = net.createServer(socket => {
    let receiveData = new Buffer(0);
    console.log('connect ' + socket.remoteAddress + ':'+socket.remotePort);

    socket.on('data',(data)=>{
        receiveData = Buffer.concat([receiveData,data],receiveData.length+ data.length-1);
    });
    socket.on('error',e=>{
        console.error('socket error:'+e);
        socket.end();
        socket.destroy();
    });

    socket.on('close',data=>{
        console.log('client closed!');
        fs.writeFile('./test2.txt', receiveData.toString(),{ 'flag': 'a' }, function(err) {
            console.log('---------------------------------')
        });
    });


});
server.listen(listenPort);
console.log('启动');