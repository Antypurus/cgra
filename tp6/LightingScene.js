var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 10;
var BOARD_B_DIVISIONS = 80;

var INCLINE_SPEED = 1;
var PEROSCOPE_SPEED = 0.01;
var TURNING_SPEED = 2;
var SUB_SPEED_ADJUSTEMENT = 0.02;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.enableTextures(true);

	this.initCameras();

	this.initLights();

	this.lastTime = 0;
	this.t = 0;

	//Gui 

	//lights
	this.light0 = true;
	this.light1 = true;
	this.light2 = true; 
	this.light3 = true;
	this.light4 = true; 
	this.light5 = true;
	this.light6 = true;

	//clock
	this.clockMovement = true;


	//Submarine Textures
	this.SubmarineAppearance = 0;
	this.black;
	this.gray;
	this.red;

	//Target Texture
	this.TargetAppearance = 0;
	this.black;
	this.gray;
	this.red;	


	//Submarine
	this.speed            = 0;
	this.subAngle         = 0; //submarine y angle
	this.subAngleVer      = this.subAngle;
	this.isLifting        = false;
	this.isLowering       = false;
	this.isturningLeft    = false;
	this.isturningRight   = false;
	this.perosCopeHeight  = 1;
	this.subxPos          = 2;
	this.subyPos          = 0;
	this.subzPos          = 8;
	this.angle            = 0 * degToRad; //submarine xz angle


	//Torpedo
	this.launchTorpedo    = false;
	this.launchTorpedo2   = false;
	this.torpedoExploded  = false;
	this.torpedoxPos      = 0;
	this.torpedoyPos      = 0;
	this.torpedozPos      = 0;


	this.gl.clearColor(0.0, 0.0, 1, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.boardA       = new Plane(this, BOARD_A_DIVISIONS, -0.10,1.10,0,1);
	this.boardB       = new Plane(this, BOARD_B_DIVISIONS, -0.10,1.10,0,1);
	this.cube         = new MyUnitCubeQuad(this);
	this.table        = new MyTable(this);
	this.wall         = new MyQuad(this,-1,2,-1,2);
	this.floor        = new MyQuad(this,0,10,0,12);
	this.prism        = new MyPrism(this,6,2);
	this.cylinder     = new MyCylinder(this,8,20,0,1,0,1);
	this.clock        = new MyClock(this);
	this.sub          = new MySubmarine(this);
	this.target1      = new MyTarget(this, -1, -5, 8);
	this.target2      = new MyTarget(this, -5, -5, -5);

	//Vetor com alvos
	this.targets      = [this.target1, this.target2];

	//vetor que vai guardar os torpedos
	this.torpedos = [];

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.waterMaterial = new CGFappearance(this);
	this.waterMaterial.loadTexture("../resources/images/sea.png");
	this.waterMaterial.setTextureWrap('REPEAT','REPEAT');

	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.WallMaterial = new CGFappearance(this);
	this.WallMaterial.setAmbient(0.3,0.3,0.3,1);
	this.WallMaterial.setDiffuse(0,0.3,0.3,1);
	this.WallMaterial.setSpecular(0.1,0.1,0.1,1);
	this.WallMaterial.setShininess(5);

	this.FloorMaterial = new CGFappearance(this);
	this.FloorMaterial.setAmbient(0.3,0.3,0.3,1);
	this.FloorMaterial.setDiffuse(0.4,0.2,0.1,1);
	this.FloorMaterial.setSpecular(0.1,0.1,0.1,1);
	this.FloorMaterial.setShininess(5);

	this.TableMaterial = new CGFappearance(this);
	this.TableMaterial.setAmbient(0.3, 0.3, 0.3,1);
	this.TableMaterial.setDiffuse(0.3,0.3,0.3,1);
	this.TableMaterial.setColor(0.8, 0.8, 0.9,1);
	this.TableMaterial.setSpecular(0.8,0.8,0.8,1);
	this.TableMaterial.setShininess(500);

	this.TableMaterial2 = new CGFappearance(this);
	this.TableMaterial2.setAmbient(0.3,0.3,0.3,1);
	this.TableMaterial2.setDiffuse(0.3,0.3,0.3,1);
	this.TableMaterial2.setColor(0.8,0.8,0.3,1);
	this.TableMaterial2.setSpecular(0.1,0.1,0.1,1);
	this.TableMaterial2.setShininess(5);

	this.tableAppearance = new CGFappearance(this);
	this.tableAppearance.loadTexture("../resources/images/table.png");
	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.loadTexture("../resources/images/floor.png");
	this.wallAppearance = new CGFappearance(this);
	this.wallAppearance.loadTexture("../resources/images/window.png");
	this.wallAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.slidesAppearance.setDiffuse(1,1,1,1);
	this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);	
	this.slidesAppearance.setShininess(5);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setDiffuse(0.4,0.4,0.4,1);
	this.boardAppearance.setSpecular(0.6,0.6,0.6,1);	
	this.boardAppearance.setShininess(100);
	this.boardAppearance.loadTexture("../resources/images/board.png");
	this.boardAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.clockAppearance = new CGFappearance(this);
	this.clockAppearance.setAmbient(0.3,0.3,0.3,1);
	this.clockAppearance.setDiffuse(0.4,0.4,0.4,1);
	this.clockAppearance.setSpecular(0.6,0.6,0.6,1);	
	this.clockAppearance.setShininess(100);
	this.clockAppearance.loadTexture("../resources/images/clock.png");

	//Textura preta do submarino
	this.blackTexture = new CGFappearance(this);
	this.blackTexture.setAmbient(0.3,0.3,0.3,1);
	this.blackTexture.setDiffuse(0.8,0.8,0.8,1);
	this.blackTexture.setSpecular(0.6,0.6,0.6,1);	
	this.blackTexture.setShininess(100);
	this.blackTexture.loadTexture("../resources/images/blackTexture.png");

	//Texture cinzenta do submarino
	this.grayTexture = new CGFappearance(this);
	this.grayTexture.setAmbient(0.3,0.3,0.3,1);
	this.grayTexture.setDiffuse(0.8,0.8,0.8,1);
	this.grayTexture.setSpecular(0.6,0.6,0.6,1);	
	this.grayTexture.setShininess(100);
	this.grayTexture.loadTexture("../resources/images/grayTexture.png");

	//Texture vermelha do submarino
	this.redTexture = new CGFappearance(this);
	this.redTexture.setAmbient(0.3,0.3,0.3,1);
	this.redTexture.setDiffuse(0.8,0.8,0.8,1);
	this.redTexture.setSpecular(0.6,0.6,0.6,1);	
	this.redTexture.setShininess(100);
	this.redTexture.loadTexture("../resources/images/redTexture.png");

	//Vetor com as texturas do submarino	
	this.submarineAppearances = [];

	//Preencher o vetor de texturas do submarino com as respetivas texturas
	this.submarineAppearances[0] = this.blackTexture;
	this.submarineAppearances[1] = this.grayTexture;
	this.submarineAppearances[2] = this.redTexture;

	//Vetor com as texturas dos targets	
	this.targetAppearances = [];

	//Preencher o vetor de texturas dos targets com as respetivas texturas
	this.targetAppearances[0] = this.blackTexture;
	this.targetAppearances[1] = this.grayTexture;
	this.targetAppearances[2] = this.redTexture;

	this.setUpdatePeriod(10);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.Gui = function ()
{ console.log("Controlling Gui "); };


LightingScene.prototype.initLights = function() {
	//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	this.setGlobalAmbientLight(0,0,0, 1.0);
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(false); // show marker on light position (different from enabled)
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(false); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0); 

	this.lights[4].setPosition(0,4,7.5,1.0);
	this.lights[4].setVisible(false);

	this.lights[5].setPosition(2,4,10,1.0);
	this.lights[5].setVisible(false);

	this.lights[6].setPosition(0,4,10,1.0);
	this.lights[6].setVisible(false);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1,1,0,1);

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);

	this.lights[2].setAmbient(0,0,0,1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1,1,1,1);
	this.lights[2].setQuadraticAttenuation(1);

	this.lights[3].setAmbient(0,0,0,1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1,1,0,1);
	this.lights[3].setQuadraticAttenuation(0.2);

	this.lights[4].setAmbient(0,0,0,1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(1,1,0,1);
	this.lights[4].setQuadraticAttenuation(0.2);

	this.lights[5].setAmbient(0, 0, 0, 1);
	this.lights[5].setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.lights[5].setSpecular(1,1,0,1);

	this.lights[6].setAmbient(0, 0, 0, 1);
	this.lights[6].setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.lights[6].setSpecular(1,1,0,1);

};
LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();

	if(this.light0)
		this.lights[0].enable();
	else
		this.lights[0].disable();
	if(this.light1)
		this.lights[1].enable();
	else
		this.lights[1].disable();
	if(this.light2)
		this.lights[2].enable();
	else
		this.lights[2].disable();
	if(this.light3)
		this.lights[3].enable();
	else
		this.lights[3].disable();
	if(this.light4)
		this.lights[4].enable();
	else
		this.lights[4].disable();
	if(this.light5)
		this.lights[5].enable();
	else
		this.lights[5].disable();
	if(this.light6)
		this.lights[6].enable();
	else
		this.lights[6].disable();
}


LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	//clock
	this.pushMatrix();
	this.translate(8,5,0);
	this.scale(0.8,0.7,0.2);
	this.clock.display();
	this.popMatrix();

	// Floor
	this.pushMatrix();
	this.translate(7.5, 0, 7.5);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(15, 15, 0.2);
	this.waterMaterial.apply();
	this.floor.display();
	this.popMatrix();

	// Poste
	this.pushMatrix();
	this.translate(8,0,0);
	this.scale(0.2,5,0.2);
	this.rotate(-90*degToRad,1,0,0);
	this.materialB.apply();
	this.prism.display();
	this.popMatrix();

	//Targets
	for(var i = 0; i < this.targets.length; i++)
	{
		this.pushMatrix();
		this.targetAppearances[this.TargetAppearance].apply();
		this.targets[i].display();
		this.popMatrix();
	}

	//Submarine
	this.pushMatrix();
	(this.submarineAppearances[this.SubmarineAppearance]).apply();
	this.sub.display();
	this.popMatrix();


	//Torpedos
	this.pushMatrix();
	this.torpedo = this.torpedos.length - 1;
	if(this.torpedo == 0 && !this.torpedoExploded) 
	{
		this.torpedos[this.torpedo].display();
	}

	this.popMatrix();

}

LightingScene.prototype.update = function (currTime) {
	var delta = currTime - this.lastTime;

	this.sub.update(currTime); //movimento por segundo das helices
	this.moveSub(); //movimento do submarino de acordo com a velocidade


	if(this.clockMovement) // se clockmovement true entao os ponteiros andam
	this.clock.update(currTime); //movimento dos ponteiros do relógio


	this.updateLights(); //escolher quais luzes a ligar ou apagar
	

		if(this.torpedos.length > 0)
	{
		this.torpedos[0].update(currTime);
		this.torpedos[0].moveTorpedo(delta);
	}

		if(this.torpedoExploded) 
	{
		this.displayExplosion(delta);
	}


	this.lastTime = currTime;
}

LightingScene.prototype.displayExplosion = function (delta)
{ 
	var time = delta/1000;

	
	if(this.t <= 1.5) // animacao da explosao dura 1.5 segundos
	{
		this.pushMatrix();
		this.targets[0].displayExplosion = true;
		this.targets[0].explosionSize += time;


		this.t += time;
		this.popMatrix();
	}
	else if(this.t > 1.5) //acaba a animacao e prepara para tratar do segundo torpedo
	{
		this.targets[0].displayExplosion = false;
		this.torpedoExploded = false;
		this.targets.shift();
		this.torpedos.pop();
		this.t = 0;
	}
}


LightingScene.prototype.changedSubTexture = function (currSubmarineAppearance){ 
	this.currSubmarineAppearance = currSubmarineAppearance;
};

LightingScene.prototype.changedTargetTexture = function (currTargetAppearance){ 
	this.currTargetAppearance = currTargetAppearance;
};


LightingScene.prototype.Rotate = function (sign){ 
	this.sub.Rotate(TURNING_SPEED*sign);
}

LightingScene.prototype.moveSub = function (){ 
	this.sub.moveSub(this.speed*SUB_SPEED_ADJUSTEMENT);
}

LightingScene.prototype.moveTorpedo = function (){ 
	this.torpedo.moveTorpedo();
}

LightingScene.prototype.changedSpeed = function (speed){ 
	this.speed += speed;
}

LightingScene.prototype.liftPeroscope = function (){ 
	this.perosCopeHeight += PEROSCOPE_SPEED;
} 

LightingScene.prototype.lowerPeroscope = function (){ 
	this.perosCopeHeight -= PEROSCOPE_SPEED;
}

LightingScene.prototype.inclineSub = function (){ 
	this.subAngle += INCLINE_SPEED*degToRad;
}

LightingScene.prototype.declineSub = function (){ 
	this.subAngle -= INCLINE_SPEED*degToRad;
};
