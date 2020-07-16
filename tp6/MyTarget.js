/**
 * MyTarget
 * @constructor
 */
 function MyTarget(scene, xPos, yPos, zPos){
    CGFobject.call(this,scene);
    this.xPos   = xPos;
    this.yPos   = yPos;
    this.zPos   = zPos;
    

    this.displayExplosion = false;
    this.explosionSize = 0;

    this.target      = new MyUnitCubeQuad(scene);
    this.myExplosion = new MyExplosion(scene);

	this.fireAppearance = new CGFappearance(scene);
	this.fireAppearance.loadTexture("../resources/images/fire.png");

 };

 MyTarget.prototype = Object.create(CGFobject.prototype);
 MyTarget.prototype.constructor = MyTarget;

 MyTarget.prototype.display = function()
 {
     this.scene.pushMatrix();
     	if(!this.displayExplosion)
     {
        this.scene.translate(this.xPos, this.yPos, this.zPos);
        this.target.display();
     }
     this.scene.popMatrix();
     

    	//Explosion
    this.scene.pushMatrix();
		if(this.displayExplosion)
	{
	   this.scene.pushMatrix();
	   this.scene.translate(this.xPos, this.yPos, this.zPos);
	   this.scene.scale(this.explosionSize+1,this.explosionSize+1,this.explosionSize+1);
	   this.fireAppearance.apply();
	   this.myExplosion.display();
	   this.scene.popMatrix();
	}
		this.scene.popMatrix();
 }