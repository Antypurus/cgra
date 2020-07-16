/**
 * MyTrapezoid
 * @constructor
 */
function MyTrapezoid(scene, higher_b, lower_b, height, width) {
	CGFobject.call(this,scene);

	this.higher_b = higher_b;
	this.lower_b  = lower_b;
	this.height   = height;
	this.width    = width;
	this.minS     = 0;
	this.maxS     = 1;
	this.minT     = 0;
	this.maxT     = 1;

	this.initBuffers();
};

MyTrapezoid.prototype = Object.create(CGFobject.prototype);
MyTrapezoid.prototype.constructor=MyQuad;

MyTrapezoid.prototype.initBuffers = function () 
{
	this.vertices = [
			//first trapezoid
            -this.higher_b/2, -this.height/2, -this.width/2, //0
           -this.lower_b/2, -this.height/2, -this.width/2, //1
            this.lower_b/2, -this.height/2, -this.width/2, //2
            this.higher_b/2, -this.height/2, -this.width/2, //3
            -this.lower_b/2, this.height/2, -this.width/2, //4
            this.lower_b/2, this.height/2, -this.width/2,  //5
			//second trapezoid
            -this.higher_b/2, -this.height/2, this.width/2, //6
           -this.lower_b/2, -this.height/2, this.width/2, //7
            this.lower_b/2, -this.height/2, this.width/2, //8
            this.higher_b/2, -this.height/2, this.width/2, //9
            -this.lower_b/2, this.height/2, this.width/2, //10
            this.lower_b/2, this.height/2, this.width/2,  //11
 			//left close
            -this.higher_b/2, -this.height/2, -this.width/2, //0 12
            -this.lower_b/2, this.height/2, -this.width/2, //4 13
            -this.higher_b/2, -this.height/2, this.width/2, //6 14
            -this.lower_b/2, this.height/2, this.width/2, //10 15
			//right close
            this.higher_b/2, -this.height/2, -this.width/2, //3 16
            this.lower_b/2, this.height/2, -this.width/2,  //5 17
            this.higher_b/2, -this.height/2, this.width/2, //9 18
            this.lower_b/2, this.height/2, this.width/2,  //11 19
			//top close
            -this.lower_b/2, this.height/2, -this.width/2, //4 20
            this.lower_b/2, this.height/2, -this.width/2,  //5 21
            -this.lower_b/2, this.height/2, this.width/2, //10 22
            this.lower_b/2, this.height/2, this.width/2,  //11 23
           	//bottom close
            -this.higher_b/2, -this.height/2, -this.width/2, //0 24
            this.higher_b/2, -this.height/2, -this.width/2, //3 25
            -this.higher_b/2, -this.height/2, this.width/2, //6 26
            this.higher_b/2, -this.height/2, this.width/2 //9 27

			];

	
	this.indices = [
			//first trapezoid
            0, 4, 1,
            4, 5, 1,
            1, 5, 2,
            2, 5, 3,
			//second trapezoid
            7, 10, 6,
            7, 11, 10,
            8, 11, 7,
            9, 11, 8,
            //left close
            13, 12, 15,
            15, 12, 14,
            //right close
            3, 5, 11,
          	11, 9, 3,
          	//top close
          	20, 22, 21,
          	22, 23, 21,
			//bottom close
			26, 25, 27,
			26, 24, 25
        ];

	

	this.normals = [
			//first trapezoid
            0, 0, -1, //0
         	0, 0, -1, //1
            0, 0, -1, //2
            0, 0, -1, //3
            0, 0, -1, //4
            0, 0, -1,  //5
			//second trapezoid
			0, 0, 1, //6
			0, 0, 1, //7
			0, 0, 1, //8
			0, 0, 1, //9
			0, 0, 1, //10
			0, 0, 1, //11
			//left close
			-1, 0, 0, //12
			-1, 0, 0, //13
			-1, 0, 0, //14
			-1, 0, 0, //15
			//right close
			1, 0, 0, //16
			1, 0, 0, //17
			1, 0, 0, //18
			1, 0, 0, //19
			//top close
			0, 1, 0, //20
			0, 1, 0, //21
			0, 1, 0, //22
			0, 1, 0, //23
			//bottom close
			0, -1, 0, //24
			0, -1, 0, //25
			0, -1, 0, //26
			0, -1, 0 //27
	];
	
	this.texCoords = [
			//first trapezoid
            this.minS, this.maxT, //0
         	this.minS, this.maxT, //1
            this.minS, this.maxT, //2
            this.minS, this.maxT, //3
            this.minS, this.minT, //4
           	this.maxS, this.minT,  //5
			//second trapezoid
            this.minS, this.maxT, //0
         	this.minS, this.maxT, //1
            this.minS, this.maxT, //2
            this.minS, this.maxT, //3
            this.minS, this.minT, //4
           	this.maxS, this.minT,  //5
			//left close
			this.maxS, this.maxT, //12
			this.maxS, this.minT, //13
			this.minS, this.maxT, //14
			this.minS, this.minT, //15
			//right close
			this.minS, this.maxT, //16
			this.minS, this.minT, //17
			this.maxS, this.maxT, //18
			this.maxS, this.minT, //19
			//top close
			this.maxS, this.minT, //20
			this.maxS, this.maxT, //21
			this.minS, this.minT, //22
			this.maxS, this.minT, //23
			//bottom close
			this.minS, this.minT, //24
			this.maxS, this.minT, //25
			this.minS, this.maxT, //26
			this.maxS, this.maxT //27
	]
	

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
