function ClienteRest(){
	this.nick;	
	this.agregarUsuario=function(nick){
		let cli=this;
		$.getJSON("/agregarUsuario/"+nick,function(data){
			//se ejecuta cuando conteste el servidor
			console.log(data);
			if (data.nick!=-1){
				console.log("Usuario "+data.nick+" registrado")
				cli.nick=data.nick;
				//ws.nick=data.nick;
				//$.cookie("nick",ws.nick);
				iu.mostrarHome();
			}
			else{
				console.log("No se ha podido registrar el usuario")
				//iu.mostrarModal("El nick ya está en uso");
				iu.mostrarAgregarUsuario();
			}
		});
	}
	this.crearPartida=function(nick){
		let cli=this;
		$.getJSON("/crearPartida/"+nick,function(data){
			//se ejecuta cuando conteste el servidor
			console.log(data);
			if (data.codigo!=-1){
				console.log("Usuario "+cli.nick+" crea partida codigo: "+data.codigo)
				//ws.nick=data.nick;
				//$.cookie("nick",ws.nick);
				//iu.mostrarHome(data);
			}
			else{
				console.log("No se ha podido crear partida")
				//iu.mostrarModal("El nick ya está en uso");
				//iu.mostrarAgregarJugador();
			}
		});
	}
	this.unirseAPartida=function(nick,codigo){
		let cli=this;
		$.getJSON("/unirseAPartida/"+nick+"/"+codigo,function(data){
			//se ejecuta cuando conteste el servidor
			//console.log(data);
			if (data.codigo!=-1){
				console.log("Usuario "+cli.nick+" se une a partida codigo: "+data.codigo)
				//ws.nick=data.nick;
				//$.cookie("nick",ws.nick);
				//iu.mostrarHome(data);
			}
			else{
				console.log("No se ha podido unir a partida")
				//iu.mostrarModal("El nick ya está en uso");
				//iu.mostrarAgregarJugador();
			}
		});
	}
}

