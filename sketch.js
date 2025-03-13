/*

The Game Project # 7

Final-assignment

Game Complete

Name: HAMZA JAWED

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var trees_x;
var treePos_y;
var clouds;
var mountains_x;
var mountains_y;
var cameraPosX;
var collectables
var canyons;
var game_score;
var flagPole;
var lives;
var jumpSound;
var fallingSound;
var winningSound;
var collectableSound;
var ouchSound;
var platforms;
var enemies;
var gameOn;




function preload(){
    soundFormats('mp3','wav');
    jumpSound=loadSound('sound/2WUUMYH-pirate-jumping-jump.mp3');
    jumpSound.setVolume(0.1);
    fallingSound=loadSound('sound/AGFAT7X-8-bit-game-lose.mp3');
    fallingSound.setVolume(0.1);
    winningSound=loadSound('sound/mixkit-huge-crowd-cheering-victory-462.wav');
    winningSound.setVolume(0.1);
    collectableSound=loadSound('sound/game-bonus-144751.mp3');
    collectableSound.setVolume(0.1);
    ouchSound=loadSound('sound/ough-47202.mp3')
    ouchSound.setVolume(0.1);
    
}





function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    lives = 3;
    startGame();
    gameOn = true;
}

function draw()
{

	///////////DRAWING CODE//////////
	background(100,255,255); //fill the sky blue


	noStroke();
	fill(155,155,55);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
    stroke(0);
    
    
    //code to move camera 
    cameraPosX = gameChar_x - width/2;
    push();
    translate(-cameraPosX,0);
    if (gameOn==true){

        // Load instructions pregame
        noStroke();
        fill(255,0,100);
        rect(100,100,width-200,height-200);
        fill(0);
        noStroke();
        textAlign(CENTER);
        textSize(20);
        text("Welcome to Your Game!\n\nInstructions:\nUse 'A' and 'D' to move left and right.\nUse 'W' to jump.\nCollect all items and reach the flagpole to win.\nAvoid enemies and falling into canyons.\n\nPress SPACE to start the game.", width / 2, height / 3);

    }
    
    if(gameOn == false){ 
        //mountains
    drawMountains();
     
    
    //trees
    drawTrees();
   
    
    //clouds
    drawClouds();
    
    //canyon
   for(var i=0; i<canyons.length;i++){
       drawCanyon(canyons[i]);
       checkCanyon(canyons[i]);
   } 
    
    //Game character
    drawChar();
    
    //draw platforms
    for(var i = 0 ; i< platforms.length; i++){
        platforms[i].draw();
    }
    
    //enemy
    for(var i = 0 ; i< enemies.length; i++){
        enemies[i].draw();
        
        var isContact = enemies[i].checkContact(gameChar_x,gameChar_y);
        if(isContact){
            if(lives>0){
                startGame();
                lives -=1;
                 ouchSound.play();
                break;
            }
        }
    } 
        
      //flagpole    
  renderflagPole();
    if(flagPole.isReached == false){  
        checkflagpole();}
    
    //collectible item
   
    for(var i = 0; i < collectables.length;i++){
       if(collectables[i].isFound == false){
            drawCollectable(collectables[i]);
            checkCollectable(collectables[i]);
        }
        }
    
    checkPlayerDie();
    }
    
    pop();
    
      if (lives < 1) {
        fill(255);
        textSize(24);
        textAlign(CENTER);
        text("Game over. Press space to continue.", width / 2, height / 2);
        return; // Prevent further game logic
    }
    
    // Display "Level complete" if flagpole is reached
    if (flagPole.isReached) {
        fill(255);
        textSize(24);
        textAlign(CENTER);
        text("Level complete. Press space to continue.", width / 2, height / 2);
        return; // Prevent further game logic
    }
    
    
       
	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    
     //checkscore
    fill(255);
    noStroke();
    text("Your Score:" + game_score,20,20);
    
    //lives
    text("LIVES: ",20,40);
    for(var i=0;i<lives;i++){
        fill(255,46,134)
        ellipse(20*(3.5+i),35,20,20);
    }
       
    // moving left code
      if(isLeft== true)
        {
            gameChar_x=gameChar_x-3
        }
    
    // moving right code
    if(isRight== true)
        {
            gameChar_x=gameChar_x+3
        }
    
    // gravity & platform check code
    if(gameChar_y<floorPos_y){
        
        var isContact = false;
        for( var i = 0; i<platforms.length; i++) {
             if(platforms[i].checkContact(gameChar_x,gameChar_y)== true){     
                 isContact = true;
                 break;
             }
        }
        
        if(isContact == false){
            gameChar_y += 2;
        isFalling = true;
        }
        
    }
    else{
        isFalling = false;
    }
    
    if(gameChar_x<300){
        startGame();
    }
    
    if(isPlummeting == true){
       gameChar_y +=20;
   }   
}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.
    

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    
    // freezing controls
    if(isPlummeting == false){
        
    // moving left key    
    if(key == 'a'){
        console.log("isLeft")
        isLeft = true;
    }
    
    // moving right key
    else if( key == 'd'){
        console.log("isRight")
        isRight = true;
    } 
    
    // jumping key and double jump prevent code
    if((key == 'w') && (gameChar_y == floorPos_y)){
      gameChar_y -= 100;
        jumpSound.play();
    }
      if(keyCode == 32 && gameOn == true)
         {gameOn =false;}   
            
}
    
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
    if(key == 'a'){
        console.log("isLeft")
        isLeft = false;
    }
    
   else if( key == 'd'){
        console.log("isRight")
        isRight = false;
    }
   if ((keyCode == 32) && (lives<1 || flagPole.isReached == true) ) { // 32 is the keyCode for space bar
        setup(); // Call the function to restart the game
    }  
}

function drawMountains(){
    for(var i=0; i< mountains_x.length; i++){
        
        fill(52,0,0);
    triangle(mountains_x[i]+450,mountains_y+430,mountains_x[i]+450,mountains_y+100,mountains_x[i]+350,mountains_y+430);
    triangle(mountains_x[i]+400,mountains_y+430,mountains_x[i]+350,mountains_y+100,mountains_x[i]+250,mountains_y+430);

    }
}

function drawClouds(){
     for( var i=0; i< clouds_x.length; i++){
         
         fill(255);
         noStroke(10);
         // Add animation to the clouds
        clouds_x[i] += 0.5; // Adjust the cloud's horizontal position
        if (clouds_x[i] > width) { // If cloud goes beyond canvas width, reset its position
            clouds_x[i] = -50;
        }
    ellipse(clouds_x[i]+170,clouds_y,45);
    ellipse(clouds_x[i]+200,clouds_y,60);
    ellipse(clouds_x[i]+230,clouds_y,45);
    }
}

function drawTrees(){
     for(var i=0; i< trees_x.length; i ++){
        console.log("trees loop" + i)
         fill(165,42,42)
    rect(trees_x[i]+30,treePos_y-110,20,110)
    fill(0,250,0)
    triangle(trees_x[i]+40,treePos_y-240,trees_x[i]-20,treePos_y-105,trees_x[i]+100,treePos_y-105);
    }
}

function drawCollectable(t_collectable){
     fill(255,0,0);
    t_collectable.y_pos = constrain(t_collectable.y_pos, floorPos_y - t_collectable.size, floorPos_y);
    noStroke();
  fill(255, 200, 0); // Yellow color
  ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size);
  // Adding a glowing effect
  let glowSize = 10;
  let glowAlpha = map(sin(frameCount * 0.05), -1, 1, 100, 200); // Vary alpha value over time for a glowing effect
  fill(255, 200, 0, glowAlpha); // Yellow color with varying alpha
  ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size + glowSize);
    // Add animation to the collectable
    t_collectable.y_pos = floorPos_y - 200 * cos(frameCount * 0.05 + t_collectable.x_pos * 0.1);

}

function drawCanyon(t_canyon){
     stroke(0)
      fill(0,255,255);
    rect(t_canyon.x_pos,t_canyon.y_pos,t_canyon.width,150);
}

function checkCollectable(t_collectable){
    if(dist(gameChar_x,gameChar_y,t_collectable.x_pos,t_collectable.y_pos)<=40){
        t_collectable.isFound = true;
        game_score +=1;
        collectableSound.play();
    }
}

function checkCanyon(t_canyon){
    if(dist(gameChar_x,gameChar_y,t_canyon.x_pos,t_canyon.y_pos)<=t_canyon.width/2){
        isPlummeting = true;
        fallingSound.play();
    }
}

function renderflagPole(){
    push();
    strokeWeight(5);
    stroke(100);
    line(flagPole.xpos,floorPos_y,flagPole.xpos,floorPos_y-250);
    fill(0,255,0);
    
    if(flagPole.isReached){
    rect(flagPole.xpos,floorPos_y-250,50,30);
    }
    else{rect(flagPole.xpos,floorPos_y-30,50,30);}
    pop();
}

function checkflagpole(){
    var d = abs(gameChar_x - flagPole.xpos);
    if(d<15 && game_score==6){
        flagPole.isReached=true;
        winningSound.play();
        
    }
}

function checkPlayerDie(){
        if(gameChar_y>height && lives>=1){
            lives-=1;
            startGame();
            
             if(lives<=0){
                lives -= 1;
                  }
        }      
}

function startGame(){
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    flagPole= {isReached: false, xpos:2500};
    trees_x=[300,600,900,1200,1500,1800]
    clouds_x = [-800,-600,-400,-200,0,200,400,600,800,1000,1200,1400,1600]
    clouds_y =[100]
    mountains_x=[0,400,800,1000,1300,1600]
    mountains_y=[0]
    treePos_y = floorPos_y;
    cameraPosX = 0;
    game_score = 0;
    var x_positions_canyon = [600, 900, 1200, 1500, 1800];
    var x_positions_collectable = [700,1000,1300,1600,1700,1900]
    
    
    collectables=[];
    for(var i = 0; i < 6; i++){
        collectables.push({x_pos: x_positions_collectable[i],
                           y_pos: 420,
                           size:round(random(20,40)),
                           isFound: false
            
        });
    }
    canyons=[];
    for(var i = 0; i < 5; i++){
        canyons.push({x_pos: x_positions_canyon[i],
                      y_pos:432,
                      width:round(random(30,40)),
                          });
    }
    
    platforms=[];
    
    platforms.push(createPlatforms(800,floorPos_y-100,200));
    platforms.push(createPlatforms(1400,floorPos_y-100,200));
    
    enemies=[];
    enemies.push(new Enemy(800,floorPos_y-10,100));
    enemies.push(new Enemy(1300,floorPos_y-10,100));
    
    
}

function drawChar(){
    	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
         fill(255,228,196);
    ellipse(gameChar_x,gameChar_y-60,25,25);
    
    fill(0);
    ellipse(gameChar_x-5,gameChar_y-62,5,5);
    ellipse(gameChar_x,gameChar_y-62,5,5);
    
    fill(0);
    stroke(0);
    line(gameChar_x-8,gameChar_y-55,gameChar_x,gameChar_y-55);
    
    fill(0);
    rect(gameChar_x-5,gameChar_y-47,10,30,5)
    
    fill(0);
    stroke(0);
    line(gameChar_x-5,gameChar_y-20,gameChar_x-5,gameChar_y-10);
    line(gameChar_x,gameChar_y-20,gameChar_x,gameChar_y-10);
    line(gameChar_x-5,gameChar_y-40,gameChar_x-20,gameChar_y-35);


	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        fill(255,228,196);
    ellipse(gameChar_x,gameChar_y-60,25,25);
    
    fill(0);
    ellipse(gameChar_x,gameChar_y-62,5,5);
    ellipse(gameChar_x+5,gameChar_y-62,5,5);
    
    fill(0);
    stroke(0);
    line(gameChar_x-5,gameChar_y-55,gameChar_x+5,gameChar_y-55);
    
    fill(0);
    rect(gameChar_x-5,gameChar_y-47,10,30,5)
    
    fill(0);
    stroke(0);
    line(gameChar_x,gameChar_y-20,gameChar_x,gameChar_y-10);
    line(gameChar_x+5,gameChar_y-20,gameChar_x+5,gameChar_y-10);
    line(gameChar_x+5,gameChar_y-40,gameChar_x+20,gameChar_y-35);

	}
	else if(isLeft)
	{
		// add your walking left code
         fill(255,228,196);
    ellipse(gameChar_x,gameChar_y-60,25,25);
    
    fill(0);
    ellipse(gameChar_x-5,gameChar_y-62,5,5);
    ellipse(gameChar_x,gameChar_y-62,5,5);
    
    fill(0);
    stroke(0);
    line(gameChar_x-8,gameChar_y-55,gameChar_x,gameChar_y-55);
    
    fill(0);
    rect(gameChar_x-5,gameChar_y-47,10,30,5)
    
    fill(0);
    stroke(0);
    line(gameChar_x-5,gameChar_y-30,gameChar_x-5,gameChar_y);
    line(gameChar_x,gameChar_y-30,gameChar_x,gameChar_y);
    line(gameChar_x-5,gameChar_y-40,gameChar_x-20,gameChar_y-35); 

	}
	else if(isRight)
	{
		// add your walking right code
        
    fill(255,228,196);
    ellipse(gameChar_x,gameChar_y-60,25,25);
    
    fill(0);
    ellipse(gameChar_x,gameChar_y-62,5,5);
    ellipse(gameChar_x+5,gameChar_y-62,5,5);
    
    fill(0);
    stroke(0);
    line(gameChar_x-5,gameChar_y-55,gameChar_x+5,gameChar_y-55);
    
    fill(0);
    rect(gameChar_x-5,gameChar_y-47,10,30,5)
    
    fill(0);
    stroke(0);
    line(gameChar_x,gameChar_y-30,gameChar_x,gameChar_y);
    line(gameChar_x+5,gameChar_y-30,gameChar_x+5,gameChar_y);
    line(gameChar_x+5,gameChar_y-40,gameChar_x+20,gameChar_y-35);


	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        fill(255,228,196);
    ellipse(gameChar_x,gameChar_y-60,25,25);
    
    fill(0);
    ellipse(gameChar_x-5,gameChar_y-62,5,5);
    ellipse(gameChar_x+5,gameChar_y-62,5,5);
    
    fill(0);
    stroke(0);
    line(gameChar_x-5,gameChar_y-55,gameChar_x+5,gameChar_y-55);
    
    fill(0);
    rect(gameChar_x-10,gameChar_y-47,20,30,5)
    
    fill(0);
    stroke(0);
    line(gameChar_x-5,gameChar_y-20,gameChar_x-5,gameChar_y-10);
    line(gameChar_x+5,gameChar_y-20,gameChar_x+5,gameChar_y-10);
    line(gameChar_x+5,gameChar_y-40,gameChar_x+20,gameChar_y-35);
    line(gameChar_x-5,gameChar_y-40,gameChar_x-20,gameChar_y-35); 

	}
	else
	{
		// add your standing front facing code
         fill(255,228,196);
    ellipse(gameChar_x,gameChar_y-60,25,25);
    
    fill(0);
    ellipse(gameChar_x-5,gameChar_y-62,5,5);
    ellipse(gameChar_x+5,gameChar_y-62,5,5);
    
    fill(0);
    stroke(0);
    line(gameChar_x-5,gameChar_y-55,gameChar_x+5,gameChar_y-55);
    
    fill(0);
    rect(gameChar_x-10,gameChar_y-47,20,30,5)
    
    fill(0);
    stroke(0);
    line(gameChar_x-5,gameChar_y-30,gameChar_x-5,gameChar_y);
    line(gameChar_x+5,gameChar_y-30,gameChar_x+5,gameChar_y);
    line(gameChar_x+5,gameChar_y-40,gameChar_x+20,gameChar_y-35);
    line(gameChar_x-5,gameChar_y-40,gameChar_x-20,gameChar_y-35); 

	}
}

function createPlatforms(x,y,length)
{
    var p={
        x:x,
        y:y,
        length: length,
        draw: function(){
                        
                        fill(155,65,255)
                        rect(this.x,this.y,this.length,20);
        
              },
        
        checkContact: function(gc_x,gc_y)
                    {
                        if(gc_x > this.x && gc_x < this.x + this.length){
                            
                            var d= this.y - gc_y;
                            if(d>=0 && d<5){
                                return true;
                            }
                            
                        }
                        return false;
                    }
        }
                    return p;
}

function Enemy(x,y,range){
    this.x =x;
    this.y =y;
    this.range = range;
    
    this.currentX = x;
    this.inc = 1;
    
    this.update = function(){
        this.currentX += this.inc;
        if(this.currentX >= this.x + this.range){
            this.inc = -1;
        }
        else if( this.currentX< this.x){
            this.inc =1;
        }
    }
    
    this.draw = function(){
        this.update();
    
        fill(20,10,25); // Dark blue color for a villainous appearance
  stroke(255); // White stroke around the ellipse
  strokeWeight(2); // Thicker stroke
  ellipse(this.currentX, this.y, 30, 40); // Ellipse with modified dimensions
  // Adding eyes
  fill(255); // White color for the eyes
  ellipse(this.currentX - 8, this.y - 5, 6, 6); // Left eye
  ellipse(this.currentX + 8, this.y - 5, 6, 6); // Right eye
  // Adding a sinister grin
  noFill();
  strokeWeight(2); // Thicker stroke for the mouth
  beginShape();
  vertex(this.currentX - 6, this.y + 6);
  bezierVertex(this.currentX - 3, this.y + 8, this.currentX + 3, this.y + 8, this.currentX + 6, this.y + 6);
  endShape();
    }
    
    this.checkContact = function(gc_x,gc_y){
        var d= dist(gc_x,gc_y,this.currentX,this.y)
        if(d<20){
            return true;
        }
        return false;
    }
}    