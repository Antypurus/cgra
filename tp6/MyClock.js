/**
 * MyClock
 * @constructor
 */

 function MyClock(scene) {
 	CGFobject.call(this,scene);
	
	this.slices = 12;
	this.stacks = 1;

	this.clockTop = new clockTop(scene);
	this.clockFiller = new MyCylinder(scene, this.slices, this.stacks);
	this.hourArrow = new myClockHand(scene, 4, 0.5);
	this.minuteArrow = new myClockHand(scene, 3, 0.8);
	this.secondArrow = new myClockHand(scene, 1, 1);

	this.clockFillerAppearance = new CGFappearance(this.scene);
	this.clockFillerAppearance.setAmbient(1, 1, 1, 1);
	this.clockFillerAppearance.setDiffuse(1, 1, 1, 1);
	this.clockFillerAppearance.setSpecular(1, 1, 1, 1);	
	this.clockFillerAppearance.setShininess(100);

	this.hourArrowAppearance = new CGFappearance(this.scene);
	this.hourArrowAppearance.setAmbient(0, 0, 0, 1);
	this.hourArrowAppearance.setDiffuse(0, 0, 0, 1);
	this.hourArrowAppearance.setSpecular(0, 0, 0, 1);	
	this.hourArrowAppearance.setShininess(100);

	this.minuteArrowAppearance = new CGFappearance(this.scene);
	this.minuteArrowAppearance.setAmbient(0, 0, 0, 1);
	this.minuteArrowAppearance.setDiffuse(0, 0, 0, 1);
	this.minuteArrowAppearance.setSpecular(0, 0, 0, 1);	
	this.minuteArrowAppearance.setShininess(100);

	this.secondArrowAppearance = new CGFappearance(this.scene);
	this.secondArrowAppearance.setAmbient(0, 0, 0, 1);
	this.secondArrowAppearance.setDiffuse(1, 0, 0, 1);
	this.secondArrowAppearance.setSpecular(0, 0, 0, 1);	
	this.secondArrowAppearance.setShininess(100);

	this.lastTime = 0;
	this.initBuffers();
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 
 MyClock.prototype.display = function() {

	//Preencher a parte de trás do relógio para nao ficar visivel o interior
	this.scene.pushMatrix();
    this.scene.translate(0, 0, 0);
    this.clockTop.display();
    this.scene.popMatrix(); 

	//Relógio com textura de relógio
 	this.scene.pushMatrix();
 	//chegar a frente para nao ficar dentro do filler do relogio
    this.scene.translate(0, 0, 1);
   	this.scene.clockAppearance.apply();
    this.clockTop.display();
    this.scene.popMatrix();   

	//Cilindro a volta do relogio
	this.scene.pushMatrix();
    this.clockFillerAppearance.apply();
	this.clockFiller.display();
	this.scene.popMatrix();

	//Ponteiro horas
	this.scene.pushMatrix();
	//chegar a frente para nao desaparecerem as setas dentro do relogio
	this.scene.translate(0, 0, 1.1);
    this.hourArrowAppearance.apply();
    this.hourArrow.setAngle(this.hour * 30);
	this.hourArrow.display();
	this.scene.popMatrix();

	//Ponteiro minutos
	this.scene.pushMatrix();
	this.scene.translate(0, 0, 1.1);
    this.minuteArrowAppearance.apply();
    this.minuteArrow.setAngle(this.minute * 6);
	this.minuteArrow.display();
	this.scene.popMatrix();	

	//Ponteiro segundos
	this.scene.pushMatrix();
	this.scene.translate(0, 0, 1.1);
    this.secondArrowAppearance.apply();
    this.secondArrow.setAngle(this.second * 6);
	this.secondArrow.display();
	this.scene.popMatrix();
		
 };

 MyClock.prototype.update = function (currTime) {

 	var currTimeSeconds = (currTime - this.lastTime) / 1000;
	this.second = currTimeSeconds / 1;
	this.minute = currTimeSeconds / 60;
	this.hour = currTimeSeconds / 3600;

};