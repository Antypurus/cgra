/**
 * clockTop
 * @constructor
 */

 function clockTop(scene,minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	this.minS = typeof minS !== 'undefined' ? minS : 0;
	this.maxS = typeof maxS !== 'undefined' ? maxS : 1;
	this.minT = typeof minT !== 'undefined' ? minT : 0;
	this.maxT = typeof maxT !== 'undefined' ? maxT : 1;
	this.slices = 12;
	this.stacks = 1;

 	this.initBuffers();
 };

 clockTop.prototype = Object.create(CGFobject.prototype);
 clockTop.prototype.constructor = clockTop;

 clockTop.prototype.initBuffers = function() {

    var degToRad = Math.PI / 180.0;
	var alpha =(360*degToRad)/this.slices;
	var ind = 0;
	var curr_x = 0;
	var curr_y = 0;
	var next_x = 0;
	var next_y = 0;
	var curr_alpha = 0;
	this.vertices =[];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
		
	for(var i = 0; i < this.slices; i++){

	//curr_x vai ser o raio do circulo em x	no inicio
    curr_x = Math.cos(curr_alpha);
    //curr_y vai ser 0 no inicio
    curr_y = Math.sin(curr_alpha);
	//curr_alpha incrementa 60 graus para chegar aos novos vertices
    curr_alpha += alpha;
	//x do segundo vertice a seguir ao inicial
    next_x = Math.cos(curr_alpha);
    //y do segundo vertice a seguir ao inicial
    next_y = Math.sin(curr_alpha);

    this.vertices.push(curr_x, curr_y,0);

    this.vertices.push(next_x, next_y, 0);
	//centro do circulo
    this.vertices.push(0,0,0);

	this.indices.push(ind, ind + 1, ind + 2);
	this.indices.push(ind+2, ind + 1, ind);
    ind += 3;
	//uma face, as normais sao iguais em todos os vertices
	this.normals.push(0,0,1);
    this.normals.push(0,0,1);
    this.normals.push(0,0,1);

    this.texCoords.push(curr_x/2 + 0.5, -curr_y/2 + 0.5);
	this.texCoords.push(next_x/2 + 0.5, -next_y/2 + 0.5);
	this.texCoords.push(0.5,0.5);
	
	}
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };