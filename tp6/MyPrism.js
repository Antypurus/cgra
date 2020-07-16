/**
 * MyPrism
 * @constructor
 */

 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {

	var alpha =(2*Math.PI)/this.slices;
	var beta = alpha/2;
	var ind = 0;
	this.vertices =[];
	this.indices = [];
	this.normals = [];
	for(var z = 0; z < this.stacks; z++){
	var sli = z/this.stacks;
	var sliplus1 = sli+1/this.stacks;
		
	for(var i = 0; i < this.slices; i++){
	this.vertices.push(Math.cos(i*alpha),Math.sin(i*alpha),sli);
	this.vertices.push(Math.cos((i+1)*alpha), Math.sin((i+1)*alpha),sli);
	this.vertices.push(Math.cos((i+1)*alpha), Math.sin((i+1)*alpha),sliplus1);
	this.vertices.push(Math.cos(i*alpha), Math.sin(i*alpha),sliplus1);

	this.indices.push(ind,ind +1 ,ind + 3);
	this.indices.push(ind+1,ind+2,ind+3);

 	this.normals.push(Math.cos(i*alpha - beta),Math.sin(i*alpha - beta),sli);
	this.normals.push(Math.cos((i)*alpha - beta),Math.sin((i)*alpha - beta),sli);
 	this.normals.push(Math.cos((i)*alpha - beta),Math.sin((i)*alpha - beta),sli);
 	this.normals.push(Math.cos((i)*alpha - beta),Math.sin((i)*alpha - beta),sli);
 	ind += 4;
	
	}
	}
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };