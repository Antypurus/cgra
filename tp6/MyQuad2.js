/**
 * MyQuad2
 * @constructor
 */
 function MyQuad2(scene, minS, maxS, minT, maxT) {
    minS = typeof minS !== 'undefined' ? minS : 0;
	maxS = typeof maxS !== 'undefined' ? maxS : 1;
	minT = typeof minT !== 'undefined' ? minT : 0;
	maxT = typeof maxT !== 'undefined' ? maxT : 1;
    this.minS = minS;
    this.maxS = maxS;
    this.minT = minT;
    this.maxT = maxT;
 	CGFobject.call(this,scene);

 	this.initBuffers();
 };

 MyQuad2.prototype = Object.create(CGFobject.prototype);
 MyQuad2.prototype.constructor = MyQuad2;

 MyQuad2.prototype.initBuffers = function() {
 	this.vertices = [
 	-0.5, -0.5, 0,
 	0.5, -0.5, 0,
 	-0.5, 0.5, 0,
 	0.5, 0.5, 0
 	];

 	this.indices = [
 	0, 1, 2, 
 	3, 2, 1,
 	2,1,0,
 	1,2,3
 	];

 	this.normals = [
      0,0,1,
      0,0,1,
      0,0,1,
      0,0,1
 	];

 	this.texCoords = [
 	this.minS, this.minT,
    this.maxS, this.minT,
    this.minS, this.maxT,
    this.maxS, this.maxT
 	]

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
