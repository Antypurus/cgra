/**
 * MyExplosion
 * @constructor
 */
 function MyExplosion(scene) {
 	CGFobject.call(this, scene);

 	this.ball = new MySubTop(this.scene, 30,6);

 };

 MyExplosion.prototype = Object.create(CGFobject.prototype);
 MyExplosion.prototype.constructor = MyExplosion;

 MyExplosion.prototype.display = function() {

 	this.scene.pushMatrix();
 	this.ball.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.rotate(180*degToRad, 0, 1, 0);
 	this.ball.display();
 	this.scene.popMatrix();
 };
