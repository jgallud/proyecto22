function ServidorWS(){
	//enviar peticiones
	this.enviarAlRemitente=function(socket,mensaje,datos){
		socket.emit(mensaje,datos);
	}
	this.enviarATodosEnPartida=function(io,codigo,mensaje,datos){
		io.sockets.in(codigo).emit(mensaje,datos);
	}
	this.enviarATodos=function(socket,mens,datos){
    		socket.broadcast.emit(mens,datos);
    }

	//gestionar peticiones
	this.lanzarServidorWS=function(io,juego){
		let cli=this;
		io.on('connection', (socket) => {
		  	console.log('Usuario conectado');
			socket.on("crearPartida",function(nick){		  	
			  	let res = juego.jugadorCreaPartida(nick);		  	
			  	let codigoStr=res.codigo.toString();
			  	socket.join(codigoStr);
	  			//cli.enviarAlRemitente(socket,"partidaCreada",res);
	  			cli.enviarATodosEnPartida(io,codigoStr,"partidaCreada",res)
	  			let lista=juego.obtenerPartidasDisponibles();
	  			cli.enviarATodos(socket,"actualizarListaPartidas",lista);
			});
			socket.on("unirseAPartida",function(nick,codigo){
			  	let codigoStr=codigo.toString();
			  	socket.join(codigoStr);
			  	let res = juego.jugadorSeUneAPartida(nick,codigo);		  	
			  	cli.enviarAlRemitente(socket,"unidoAPartida",res);		  	
			  	let partida=juego.obtenerPartida(codigo);
			  	if (partida.esJugando()){
			  		cli.enviarATodosEnPartida(io,codigoStr,"aJugar",{});
			  	}

			});
		});
	}
}

module.exports.ServidorWS=ServidorWS;