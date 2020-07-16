/**
 * myClockHand
 * @constructor
 */

 function myClockHand(scene, width, height) {
 	CGFobject.call(this,scene);
 	this.width = width;
 	this.height = height;
 	this.initBuffers();
 };

 myClockHand.prototype = Object.create(CGFobject.prototype);
 myClockHand.prototype.constructor = myClockHand;

 myClockHand.prototype.initBuffers = function() {

	this.vertices = [0.008, 0, 0, 
	0, 1, 0,
	-0.008, 0, 0];

	this.indices = [0, 1, 2];

    // normais iguais por ser uma face e em Z por estar no eixo xy
    this.normals = [ 0, 0, 1, 
    0, 0, 1, 
    0, 0, 1];    

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 myClockHand.prototype.setAngle = function(angle)
 {
     this.angle = angle * degToRad;
     this.scene.rotate(-this.angle, 0, 0, 1);
	 this.scene.scale(this.width, this.height, 1); // dso faz uma vez scale
 };
 

