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
				$.cookie("nick",data.nick);
				iu.mostrarHome();//iu.mostrarHome(data.nick)
			}
			else{
				console.log("No se ha podido registrar el usuario")
				iu.mostrarModal("El nick ya está en uso");
				iu.mostrarAgregarUsuario();
			}
		});
	}
	this.crearPartida=function(){
		let cli=this;
		let nick=cli.nick;
		$.getJSON("/crearPartida/"+nick,function(data){
			console.log(data);
			if (data.codigo!=-1){
				console.log("Usuario "+nick+" crea partida codigo: "+data.codigo)
				iu.mostrarCodigo(data.codigo);
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
	this.unirseAPartida=function(codigo){
		let cli=this;
		$.getJSON("/unirseAPartida/"+cli.nick+"/"+codigo,function(data){
			//se ejecuta cuando conteste el servidor
			//console.log(data);
			if (data.codigo!=-1){
				console.log("Usuario "+cli.nick+" se une a partida codigo: "+data.codigo);
				iu.mostrarCodigo(data.codigo);
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
	this.obtenerListaPartidas=function(){
		let cli=this;
		//obtenerPartidasDisponibles
		$.getJSON("/obtenerPartidas",function(lista){
			console.log(lista);
			iu.mostrarListaDePartidas(lista);
		});
	}
	this.obtenerListaPartidasDisponibles=function(){
		let cli=this;
		$.getJSON("/obtenerPartidasDisponibles",function(lista){
			console.log(lista);
			iu.mostrarListaDePartidasDisponibles(lista);
		});
	}
}

