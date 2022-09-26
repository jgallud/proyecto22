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
	this.crearPartida=function(nick){
		//obtener código único
		//crear partida con propietario nick
		//devolver el código
		console.log("partida creada");
	}
}

function Usuario(nick,juego){
	this.nick=nick;
	this.juego=juego;
	this.crearPartida=function(){
		this.juego.crearPartida(this.nick)
	}
}

function Partida(){
	this.codigo;
}