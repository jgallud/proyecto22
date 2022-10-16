function Juego(){
	this.partidas={};
	this.usuarios={}; //array asociativo

	this.agregarUsuario=function(nick){
		let res={"nick":-1};
		if (!this.usuarios[nick]){
			this.usuarios[nick]=new Usuario(nick,this);
			res={"nick":nick};
			console.log("Nuevo usuario: "+nick);
		}
		return res;
	}
	this.eliminarUsuario=function(nick){
		delete this.usuarios[nick];
	}
	this.jugadorCreaPartida=function(nick){
		let usr = this.usuarios[nick];
		let res={codigo:-1};
  		if (usr){
    		let codigo=usr.crearPartida();
	    	//let codigo=this.crearPartida(usr);
	    	res={codigo:codigo};
	    }
    	return res;
	}
	this.jugadorSeUneAPartida=function(nick,codigo){
		let usr = this.usuarios[nick];
		let res={"codigo":-1};
  		if (usr){
    		let valor=usr.unirseAPartida(codigo);
    		//let valor=this.unirseAPartida(codigo,usr)
	    	res={"codigo":valor};
	    }
    	return res;
	}
	this.crearPartida=function(usr){
		let codigo=Date.now();
		console.log("Usuario "+usr.nick+ " crea partida "+codigo);
		this.partidas[codigo]=new Partida(codigo,usr); 
		return codigo;
	}
	this.unirseAPartida=function(codigo,usr){
		let res=-1;
		if (this.partidas[codigo]){
			res=this.partidas[codigo].agregarJugador(usr);
		}
		else{
			console.log("La partida no existe");
		}
		return res;
	}
	this.obtenerPartidas=function(){
		let lista=[];
		for (let key in this.partidas){
			lista.push({"codigo":key,"owner":this.partidas[key].owner.nick});
		}
		return lista;
	}
	this.obtenerPartidasDisponibles=function(){
		let lista=[];
		for (let key in this.partidas){
			if (this.partidas[key].fase=="inicial"){
				lista.push({"codigo":key,"owner":this.partidas[key].owner.nick});
			}
		}
		return lista;
	}
}

function Usuario(nick,juego){
	this.nick=nick;
	this.juego=juego;
	this.crearPartida=function(){
		return this.juego.crearPartida(this)
	}
	this.unirseAPartida=function(codigo){
		return this.juego.unirseAPartida(codigo,this);
	}
}

function Partida(codigo,usr){
	this.codigo=codigo;
	this.owner=usr;
	this.jugadores=[];
	this.fase="inicial"; //new Inicial()
	this.maxJugadores=2;
	this.agregarJugador=function(usr){
		let res=this.codigo;
		if (this.hayHueco()){
			this.jugadores.push(usr);
			console.log("El usuario "+usr.nick+" se une a la partida "+this.codigo);
			this.comprobarFase();
		}
		else{
			res=-1;
			console.log("La partida está completa")
		}
		return res;
	}
	this.comprobarFase=function(){
		if (!this.hayHueco()){
			this.fase="jugando";
		}
	}
	this.hayHueco=function(){
		return (this.jugadores.length<this.maxJugadores)
	}
	this.agregarJugador(this.owner);
}

module.exports.Juego = Juego;