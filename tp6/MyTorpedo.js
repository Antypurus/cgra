function MyTorpedo(scene, xPos, yPos, zPos, angle, subAngle){
   	CGFobject.call(this,scene);
	this.xPos  = xPos;
	this.yPos  = yPos;
	this.zPos  = zPos;
	this.angle = angle;
	this.subAngle = subAngle;
	
	this.anglezxy = 0;
	this.angley = 0;
	this.target = this.scene.targets[0];
	this.vector = [];
	this.angleVector = [];
	this.distance = 0;
	this.magnitude = 0;
	this.magnitude2 = 0;
	this.dotProductResult = 0;
	this.crossProductResult = [];

	this.velocityVector = [];
	
    this.destroyTarget = false;

	this.animationTime;
	this.p1 = [];
	this.p2 = [];
	this.p3 = [];
	this.p4 = [];

	this.initialOrientation = [-1,0,0];

	this.t = 0;

	this.lastTime = 0;
	
    this.top         = new MySubTop(scene,8,4);
	this.bot         = new MySubTop(scene,8,4);
	this.body        = new MyCylinder(scene,8,4);
	this.trapezoid   = new MyTrapezoid(scene, 1,0.8,1,1);

}

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor=MyTorpedo;

MyTorpedo.prototype.bezierCalculation = function()
{
	this.p1 =
		[
		this.xPos,
		this.yPos,
		this.zPos 
		];

	this.p4 = [
    	this.target.xPos + 0.2, // para atingir o centro do alvo
		this.target.yPos,
		this.target.zPos 
		];
	
	for(var i = 0; i < this.p4.length && i < this.p1.length;i++)
	{
		this.vector[i] = this.p4[i] - this.p1[i];
	}

	this.p2 = 
    	[
        -6*Math.cos(this.subAngle)*Math.cos(this.angle) + this.xPos,
        6*Math.sin(this.subAngle) + this.yPos,
        6*Math.cos(this.angle)*Math.sin(this.angle) + this.zPos
        ];
	
    this.p3 = 
    	[
        this.target.xPos + 0.2, // para atingir o centro do alvo
        this.target.yPos + 3,
        this.target.zPos 
        ];


	this.distance = Math.sqrt(Math.pow(this.vector[0],2) + Math.pow(this.vector[1],2) + Math.pow(this.vector[2],2));

    this.animationTime = Math.round(this.distance);   

	this.destroyTarget = true;
}

MyTorpedo.prototype.display = function(){


	this.scene.translate(this.xPos, this.yPos, this.zPos);

	this.crossProductResult = 
	[ this.initialOrientation[1] * this.velocityVector[2] - this.initialOrientation[2] * this.velocityVector[1]
	, this.initialOrientation[2] * this.velocityVector[0] - this.initialOrientation[0] * this.velocityVector[2]
	, this.initialOrientation[0] * this.velocityVector[1] - this.initialOrientation[1] * this.velocityVector[0]];
	
	this.calculateRotatingAngle(this.initialOrientation, this.velocityVector);

	this.scene.rotate(this.anglezxy, this.crossProductResult[0], this.crossProductResult[1],this.crossProductResult[2]);


	this.scene.scale(0.2,0.2,0.2);
	this.scene.translate(2, 0, 0); //centrar o torpedo na origem

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

	//Barbatana vertical
	this.scene.pushMatrix();
	this.scene.scale(0.3,2.5,0.1);
	this.scene.translate(-0.5,0.3,0);
	this.scene.rotate(90*degToRad,0,0,1);
	this.trapezoid.display();
	this.scene.popMatrix();

	//Barbatana horizontal
	this.scene.pushMatrix();
	this.scene.rotate(-90*degToRad,1,0,0);
	this.scene.rotate(-90*degToRad,0,0,1);
	this.scene.scale(2,0.2,0.1);
	this.scene.translate(0,0,6);
	this.trapezoid.display();
	this.scene.popMatrix();
}


MyTorpedo.prototype.calculateRotatingAngle = function(vector1, vector2)
{
	this.magnitude = Math.sqrt(Math.pow(vector1[0],2) + Math.pow(vector1[1],2) + Math.pow(vector2[2],2));

	this.magnitude2 = Math.sqrt(Math.pow(vector2[0],2) + Math.pow(vector2[1],2) + Math.pow(vector2[2],2));

	this.dotProductResult = vector1[0] * vector2[0] + vector1[1] * vector2[1] + vector1[2] * vector2[2];

	this.anglezxy = Math.acos(this.dotProductResult / (this.magnitude * this.magnitude2));
}

MyTorpedo.prototype.update = function(currTime)
{
	var currTimeSeconds = currTime / 1000;
	this.second = currTimeSeconds;
}

MyTorpedo.prototype.moveTorpedo = function(lastTime){

    var delta = lastTime/1000;

    if(this.destroyTarget){
    
        if(this.t <= 1){

        	var xPos = this.xPos;
        	var yPos = this.yPos;
        	var zPos = this.zPos;

            var t = this.t;

            this.xPos = Math.pow((1-t), 3) * this.p1[0] + 3*Math.pow((1-t), 2) * t * this.p2[0] + 3*(1-t) * Math.pow(t, 2) * this.p3[0] + Math.pow(t, 3) * this.p4[0]; 

            this.yPos = Math.pow((1-t), 3) * this.p1[1] + 3*Math.pow((1-t), 2) * t * this.p2[1] + 3*(1-t) * Math.pow(t, 2) * this.p3[1] + Math.pow(t, 3) * this.p4[1]; 

            this.zPos = Math.pow((1-t), 3) * this.p1[2] + 3*Math.pow((1-t), 2) * t * this.p2[2] + 3*(1-t) * Math.pow(t, 2) * this.p3[2] + Math.pow(t, 3) * this.p4[2]; 

            

            this.velocityVector = 
            [
				this.xPos - xPos,
				this.yPos - yPos,
				this.zPos - zPos
    		];


    		this.t += delta/(this.animationTime);

        }
        else{
            this.destroyTarget = false;
            this.scene.torpedoExploded = true;
        }
    }
};