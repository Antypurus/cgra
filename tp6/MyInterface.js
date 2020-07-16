var ROTATE_LEFT  = 1;
var ROTATE_RIGHT = -1;

/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	this.gui.add(this.scene, 'Gui');	

	
	var lights = this.gui.addFolder("Lights");

	
	lights.add(this.scene, 'light0');
	lights.add(this.scene, 'light1');
	lights.add(this.scene, 'light2');
	lights.add(this.scene, 'light3');
	lights.add(this.scene, 'light4');
	lights.add(this.scene, 'light5');
	lights.add(this.scene, 'light6');
	
	this.gui.add(this.scene, 'clockMovement').name("Clock Movement ");

	
	this.gui.add(this.scene, 'SubmarineAppearance', {black:0, gray:1, red:2}).name("Submarine Appearance").onChange(
	function(value)
		{
		currSubmarineAppearance = value;
		this.object.changedSubTexture(value);
		});

	this.gui.add(this.scene, 'TargetAppearance', {black:0, gray:1, red:2}).name("Target Appearance").onChange(
	function(value)
		{
		currTargetAppearance = value;
		this.object.changedTargetTexture(value);
		});

	this.gui.add(this.scene, 'speed', -5, 5).name("Submarine Speed ").listen();

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (119): //w
			if(this.scene.speed < 4.9)
			this.scene.changedSpeed(0.1);
		  	break;

		case (97): //a
			this.scene.Rotate(ROTATE_LEFT);
			this.scene.isturningLeft = true;
	      	break;

		case (115): //s
			if(this.scene.speed > -4.9)
			this.scene.changedSpeed(-0.1);
		 	break;

		case (100): //d
			this.scene.Rotate(ROTATE_RIGHT);
			this.scene.isturningRight = true;
		 	break;

		case(108): // l
			if(this.scene.perosCopeHeight > 0.7)
			this.scene.lowerPeroscope();
			break;

		case(112): // p
			if(this.scene.perosCopeHeight < 1.3)
			this.scene.liftPeroscope();
			break;
		
		case(113): // q
			if(this.scene.subAngle < 30*degToRad)
			{
				this.scene.inclineSub();
				this.scene.isLifting = true;
			}
			else
				this.scene.isLifting = false;
			break;

		case(101): // e
			if(this.scene.subAngle > -30*degToRad)
			{
				this.scene.declineSub();
				this.scene.isLowering = true;
			}
			else
				this.scene.isLowering = false;
			break;

		case(102): // f
			if(this.scene.targets.length > 0 && this.scene.torpedos.length == 0)
			 {
				this.scene.torpedos.push(
				new MyTorpedo(this.scene, 
				this.scene.subxPos, 
				(this.scene.subyPos-0.4), // - 0.4 para ir para baixo do submarino
				this.scene.subzPos,
				this.scene.angle,
				this.scene.subAngle)); //quando o utilizador pressionar f, cria um novo torpedo na posicao do submarino
				
				this.scene.torpedos[0].bezierCalculation(); // calcula os pontos de bezier para o primeiro torpedo->alvo
			 }
			 break;
	};
}

//Função que deteta a subida das teclas
MyInterface.prototype.processKeyUp = function(event) 
{
/*Para mover as barbatanas é preciso saber quando o utilizador já nao está a levantar ou a virar
	o submarino(nao carregar em Q,E,A,D), para elas voltarem ao estado inicial */	

	this.scene.isLifting      = false;
	this.scene.isLowering     = false;
	this.scene.isturningRight = false;
	this.scene.isturningLeft  = false;
};
