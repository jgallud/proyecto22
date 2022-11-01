function ClienteWS(){
	this.socket;
	this.codigo;
	this.conectar=function(){
		this.socket=io();
		this.servidorWS();
	}
	this.crearPartida=function(){
		this.socket.emit("crearPartida",rest.nick);
	}
	this.unirseAPartida=function(codigo){
		this.socket.emit("unirseAPartida",rest.nick,codigo);
	}
	this.abandonarPartida=function(){
		this.socket.emit("abandonarPartida",rest.nick,cws.codigo);
	}
	this.servidorWS=function(){
		let cli=this;
		this.socket.on("partidaCreada",function(data){
			console.log(data);
			if (data.codigo!=-1){
				console.log("Usuario "+rest.nick+" crea partida codigo: "+data.codigo)
				iu.mostrarCodigo(data.codigo);
				cli.codigo=data.codigo;
			}
			else{
				console.log("No se ha podido crear partida");
				iu.mostrarModal("No se ha podido crear partida");
				iu.mostrarCrearPartida();
			}
		});
		this.socket.on("unidoAPartida",function(data){
			if (data.codigo!=-1){
				console.log("Usuario "+rest.nick+" se une a partida codigo: "+data.codigo);
				iu.mostrarCodigo(data.codigo);
				cli.codigo=data.codigo;
			}
			else{
				console.log("No se ha podido unir a partida");
			}
		});
		this.socket.on("actualizarListaPartidas",function(lista){
			if (!cli.codigo){
				iu.mostrarListaDePartidasDisponibles(lista);
			}
		});
		this.socket.on("aJugar",function(){
			iu.mostrarModal("A jugaaar!");
		})
	}
}