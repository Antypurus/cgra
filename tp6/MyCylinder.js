/**
 * MyPrism
 * @constructor
 */

 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {

	var alpha =(2*Math.PI)/this.slices;
	var beta = alpha/2;
	var ind = 0;
	this.vertices =[];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
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
	this.indices.push(ind+3,ind +1 ,ind);
	this.indices.push(ind+3,ind+2,ind+1);

	this.normals.push(Math.cos(i*alpha),Math.sin(i*alpha),sli);
	this.normals.push(Math.cos((i+1)*alpha), Math.sin((i+1)*alpha),sli);
	this.normals.push(Math.cos((i+1)*alpha), Math.sin((i+1)*alpha),sliplus1);
	this.normals.push(Math.cos(i*alpha), Math.sin(i*alpha),sliplus1);
 	ind += 4;
	
	this.texCoords.push(1 - i / this.slices, z / this.stacks);
	this.texCoords.push(1 - (i + 1) / this.slices, z / this.stacks);		
	this.texCoords.push(1 - i / this.slices, (z + 1) / this.stacks);
	this.texCoords.push(1 - (i + 1) / this.slices, (z + 1) / this.stacks);
	}
	}
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };