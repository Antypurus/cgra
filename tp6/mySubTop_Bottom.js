 /**
 * MySubTop
 * @constructor
 */

 function MySubTop(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MySubTop.prototype = Object.create(CGFobject.prototype);
 MySubTop.prototype.constructor = MySubTop;

 MySubTop.prototype.initBuffers = function() {

	var slicesCoord = 1/this.slices;
	var stacksCoord = 1/this.stacks;
	var beta  = (2*Math.PI)/this.slices;
	var alpha = (Math.PI/2)/this.stacks;
	
	this.vertices  = [];
	this.indices   = [];
	this.normals   = [];
	this.texCoords = [];
	
	for(var z = 0; z <= this.stacks; z++)
	{
		for(var i = 0; i <= this.slices; i++)
		{
			this.vertices.push(Math.cos(z*alpha)*Math.cos(i*beta), Math.cos(z*alpha)*Math.sin(i*beta), Math.sin(z*alpha));
			this.normals.push(Math.cos(z*alpha)*Math.cos(i*beta), Math.cos(z*alpha)*Math.sin(i*beta), Math.sin(z*alpha));
		}
	}

		for(var z = 0; z < this.stacks; z++)
	{
		for (var i = 0; i < this.slices; i++)
		{
			this.indices.push( z * (this.slices +1) + i, z * (this.slices +1) + i + 1, (z + 1) * (this.slices +1) + i );
			this.indices.push( z * (this.slices +1) + i + 1, (z + 1) * (this.slices +1) + i + 1, (z + 1) * (this.slices +1) + i );
		}
	}

			for(var t = 0; t <= this.stacks; t++)
	{
		for(var s = 0; s <= this.slices; s++)
		{
			this.texCoords.push(slicesCoord * s, stacksCoord * t);
		}
	}
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
