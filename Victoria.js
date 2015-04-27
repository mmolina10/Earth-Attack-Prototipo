﻿#pragma strict
var PosX:int = 150;
var PosY:int = 50;
var PosX1:int = 300;
var PosY1:int = 300;
private var mensaje : String = "¡Victoria!";
var scriptEnemigos : BarraVidaYEnemigos;
var scriptGolpe : TexturaGolpe;
var pauseEnabled;
var estilo : GUISkin;
static var victoria : boolean;
var scriptDerrota : Derrota;
private var _connector : DBConnector;

function Start () {
	scriptEnemigos = GetComponent("BarraVidaYEnemigos");
	scriptGolpe = GetComponent("TexturaGolpe");
	scriptDerrota = GetComponent("Derrota");
	AudioListener.volume = 1;
	Screen.showCursor = false;
	pauseEnabled = false;
	victoria = false;
	_connector = gameObject.AddComponent.<DBConnector>();
	_connector.OpenDB("URI=file:"+ Application.dataPath + "/db_earth_attack.s3db");
	_connector.InsertData('Marc',2.0000, 40, 10, 20000);
	_connector.CloseDB();
}

function Update () {
	Derrota();
}

function OnGUI(){
	GUI.skin = estilo;
	if(pauseEnabled == true){
		GUI.Label(Rect (Screen.width/2.33-(PosX/2), Screen.height/5-(PosY/1.5),500, 500),mensaje);
		GUI.Box(Rect (Screen.width/2-(PosX1/2), Screen.height/2-(PosY1/2), PosX1, PosY1),"");
		if(victoria == true){
			if(scriptDerrota.derrota == false){
				GameObject.Find("Nave").GetComponent(movimientosRatonNave).enabled = false;
			}
		}
		
// botones del menu
		
// Resumen

		if(GUI.Button(Rect(Screen.width /2 - 120,Screen.height /2 - 80,250,50), "Volver a jugar")){
			//Vuelve al juego
			scriptEnemigos.muertos = 0;
			Application.LoadLevel(Application.loadedLevel);
		}	


// volver a menu principal

		if(GUI.Button(Rect(Screen.width /2 - 120,Screen.height /2 - -30,250,50), "Volver al menú principal" )){
			Application.LoadLevel("MenuPrincipal");
		}	
	}	
}

function Derrota(){
	if(scriptDerrota.derrota == false){
		if(scriptEnemigos.muertos == 40){
			if(pauseEnabled == false){
				victoria = true;
				yield WaitForSeconds(0.5);
				scriptGolpe.text = null;
				pauseEnabled = true;
				AudioListener.volume = 0;
				Time.timeScale = 0;
				Screen.showCursor = true;
			}
		}
	}
}