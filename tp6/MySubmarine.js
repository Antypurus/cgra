/**
 * MySubmarine
 * @constructor
 */
 function MySubmarine(scene) {
 	CGFobject.call(this,scene);

 	this.windAngle    = 0;
	this.lastTime     = 0;
	this.lastVelocity = 0;
	this.second       = 0;
	this.veloc        = 0;
	
	this.top        = new MySubTop(scene,30,4);
	this.bot        = new MySubTop(scene,30,4);
	this.body       = new MyCylinder(scene,30,4);
	this.perosCope  = new MyCylinder(scene,30,4);
	this.Scope      = new MyCylinder(scene,30,4);
	this.tower      = new MyCylinder(scene,30,4);
	this.towerbody  = new clockTop(scene);
	this.trap       = new MyQuad(scene);
	this.trap2      = new MyQuad2(scene);
	this.sideTrap   = new MyQuad2(scene);
	this.sides      = new MyCylinder(scene,30,4);
	this.trapezoid  = new MyTrapezoid(scene, 1,0.8,1.42,1);
	this.trapezoid2 = new MyTrapezoid(scene, 2.34,1.64,0.2,0.1);
	//this.sideTrap    = new MyTrapezoid(scene, 1,1,1,1,0,1,0,1); //paralelepipedo para as turbinas

 	this.initBuffers();
 };

 MySubmarine.prototype = Object.create(CGFobject.prototype);
 MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.update = function(currTime)
{
	var currTimeSeconds = currTime / 1000;
	this.second = currTimeSeconds; 
	this.veloc = this.second * 100;
}

MySubmarine.prototype.Rotate = function(speed)
{
	this.scene.angle += speed*degToRad;
}

MySubmarine.prototype.moveSub = function(speed)
{
	var velocity = this.veloc - this.lastVelocity;
	
	this.scene.subzPos += velocity * speed * Math.cos(this.scene.angle-90*degToRad);
	this.scene.subxPos += velocity * speed * Math.sin(this.scene.angle-90*degToRad);
	this.scene.subyPos += velocity * this.scene.subAngle*speed;

	var delta = this.second -this.lastTime;

	if(speed > 0)
		this.windAngle += delta*(360*degToRad)+speed; //a cada segundo as helices fazem uma rotação
	else if(speed < 0)
		this.windAngle += -delta*(360*degToRad)+speed;
	else
		this.windAngle += delta*(360*degToRad);

	if(this.windAngle<-360){
		this.windAngle = 0;
	}
	if(this.windAngle>360){
		this.windAngle = 0;
	}

	this.lastTime = this.second;
	this.lastVelocity = this.veloc;
}


MySubmarine.prototype.display = function() 
{

	//Fazer translate sempre que se quer mover
	this.scene.translate(this.scene.subxPos, this.scene.subyPos, this.scene.subzPos);

	//Fazer rotate do submarino(esquerda e direita)
	this.scene.rotate(this.scene.angle, 0,1,0);

	//Fazer rotate do submarino(cima e baixo)
	this.scene.rotate(-this.scene.subAngle,0,0,1);
		

	//translate para a inclinação do submarino ser feita no centro
	this.scene.translate(2, 0, 0);
	
	//Top
	this.scene.pushMatrix();
	this.scene.scale(0.73/2, 1.2/2, 0.46);
	this.scene.translate(0,1,0);
	this.scene.rotate(90*degToRad,0,1,0);
	this.top.display();
	this.scene.popMatrix();

	//Bottom
	this.scene.pushMatrix();
	this.scene.scale(0.73/2, 1.2/2, 0.46);
	this.scene.translate(-11.15,1,0);
	this.scene.rotate(-90*degToRad,0,1,0);
	this.bot.display();
	this.scene.popMatrix();


	//Body
	this.scene.pushMatrix();
	this.scene.scale(0.73/2, 1.2/2, 0.46);
	this.scene.scale(11.15,1,1);
	this.scene.translate(0,1,0);
	this.scene.rotate(-90*degToRad,0,1,0);
	this.body.display();
	this.scene.popMatrix();


	//Tower
	this.scene.pushMatrix();
	this.scene.translate(-3,1.7,0);
	this.scene.scale(0.88/2, 1,0.46/2);
	this.scene.rotate(90*degToRad,1,0,0);
	this.tower.display();
	this.scene.popMatrix();

	//TowerBody
	this.scene.pushMatrix();
	this.scene.translate(-3,1.7,0);
	this.scene.scale(0.88/2, 0.57/2,0.46/2);
	this.scene.rotate(-90*degToRad,1,0,0);
	this.towerbody.display();
	this.scene.popMatrix();

	//Peroscope
	this.scene.pushMatrix();
	this.scene.translate(-3.2,2.2,0);
	this.scene.scale(0.06, 1,0.06);
	this.scene.translate(0,this.scene.perosCopeHeight-1,0);
	this.scene.rotate(90*degToRad,1,0,0);
	this.perosCope.display();
	this.scene.popMatrix();

	//PeroscopeScope
	this.scene.pushMatrix();
	this.scene.translate(-3.40,2.14,0);
	this.scene.translate(0,this.scene.perosCopeHeight-1,0);
	this.scene.scale(0.16, 0.05,0.05);
	this.scene.rotate(90*degToRad,0,1,0);
	this.Scope.display();
	this.scene.popMatrix();

	//PeroscopeBody
	this.scene.pushMatrix();
	this.scene.translate(-3.2,2.2,0);
	this.scene.scale(0.06, 1,0.06);
	this.scene.translate(0,this.scene.perosCopeHeight-1,0);
	this.scene.rotate(-90*degToRad,1,0,0);
	this.towerbody.display();
	this.scene.popMatrix();

	//Sides
	this.scene.pushMatrix();
	this.scene.scale(0.4/2,0.4/2,0.4/2);
	this.scene.rotate(90*degToRad,0,1,0);
	this.scene.translate(-2.7,1,-1);
	this.sides.display();
	this.scene.popMatrix();

	//Sides
	this.scene.pushMatrix();
	this.scene.scale(0.4/2,0.4/2,0.4/2);
	this.scene.rotate(90*degToRad,0,1,0);
	this.scene.translate(2.7,1,-1);
	this.sides.display();
	this.scene.popMatrix();

	//Left side circle
	this.scene.pushMatrix();
	this.scene.scale(0.05,0.05,0.05);
	this.scene.rotate(90*degToRad,0,1,0);
	this.scene.translate(-10.75,3.9,-1.8);
	this.top.display();
	this.scene.popMatrix();

	//Right side circle
	this.scene.pushMatrix();
	this.scene.scale(0.05,0.05,0.05);
	this.scene.rotate(90*degToRad,0,1,0);
	this.scene.translate(10.75,3.9,-1.8);
	this.top.display();
	this.scene.popMatrix();

	//Sides Barbatana esquerda
	this.scene.pushMatrix();
	this.scene.translate(-0.078,0.2,0.535);
	this.scene.rotate(90*degToRad,0,1,0);	
	this.scene.rotate(this.windAngle,0,0,1);
	this.scene.scale(0.05,0.35,0.1);
	this.sideTrap.display();
	this.scene.popMatrix();

	//Sides Barbatana direita
	this.scene.pushMatrix();
	this.scene.translate(-0.078,0.2,-0.535);
	this.scene.rotate(90*degToRad,0,1,0);	
	this.scene.rotate(-this.windAngle,0,0,1);
	this.scene.scale(0.05,0.35,0.1);
	this.sideTrap.display();
	this.scene.popMatrix();

	//Barbatana torre
	this.scene.pushMatrix();
	//this.scene.translate(5,1,5);
	this.scene.rotate(-90*degToRad,1,0,0);
	this.scene.rotate(-90*degToRad,0,0,1);
	this.scene.scale(1.42,0.2,0.1);
	this.scene.translate(0,-14.8,13.5);
	if(this.scene.isLifting)
	this.scene.rotate(-30*degToRad,1,0,0);
	if(this.scene.isLowering)
	this.scene.rotate(30*degToRad,1,0,0);
	this.trapezoid.display();
	this.scene.popMatrix();


	//Barbatana vertical
	this.scene.pushMatrix();
	//this.scene.scale(0.2,2.5,0.1);
	this.scene.translate(0,0.6,0);
	this.scene.rotate(90*degToRad,0,0,1);
	if(this.scene.isturningLeft)
	this.scene.rotate(45*degToRad,1,0,0);
	if(this.scene.isturningRight)
	this.scene.rotate(-45*degToRad,1,0,0);
	this.trapezoid2.display();
	this.scene.popMatrix();

	//Barbatana horizontal
	this.scene.pushMatrix();
	//this.scene.translate(5,1,5);
	this.scene.rotate(-90*degToRad,1,0,0);
	this.scene.rotate(-90*degToRad,0,0,1);
	this.scene.scale(2,0.2,0.1);
	this.scene.translate(0,0,6);
	if(this.scene.isLifting)
	this.scene.rotate(-30*degToRad,1,0,0);
	if(this.scene.isLowering)
	this.scene.rotate(30*degToRad,1,0,0);
	this.trapezoid.display();
	this.scene.popMatrix();


};
