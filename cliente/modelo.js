function Juego(){
	this.partidas={};
	this.usuarios={}; //array asociativo

	this.agregarUsuario=function(nick){
		if (!this.usuarios[nick]){
			this.usuarios[nick]=new Usuario(nick,this);
		}
	}
	this.eliminarUsuario=function(nick){
		delete this.usuarios[nick];
	}
	this.crearPartida=function(usr){
		let codigo=Date.now();
		this.partidas[codigo]=new Partida(codigo,usr); 
		return codigo;
	}
	this.unirseAPartida=function(codigo,usr){
		if (this.partidas[codigo]){
			this.partidas[codigo].agregarJugador(usr);
		}
		else{
			console.log("La partida no existe");
		}
	}
	this.obtenerPartidas=function(){
		let lista=[];
		for (let key in this.partidas){
			lista.push({"codigo":key,"owner":this.partidas[key].owner});
		}
		return lista;
	}
	this.obtenerPartidasDisponibles=function(){
		//devolver sólo las partidas sin completar
	}
}

function Usuario(nick,juego){
	this.nick=nick;
	this.juego=juego;
	this.crearPartida=function(){
		return this.juego.crearPartida(this)
	}
	this.unirseAPartida=function(codigo){
		this.juego.unirseAPartida(codigo,this);
	}
}

function Partida(codigo,usr){
	this.codigo=codigo;
	this.owner=usr;
	this.jugadores=[];
	this.fase="inicial"; //new Inicial()
	this.agregarJugador=function(usr){
		if (this.jugadores.length<2){
			this.jugadores.push(usr);
		}
		else{
			console.log("La partida está completa")
		}
	}
	this.agregarJugador(this.owner);
}