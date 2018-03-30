var content=document.getElementById('content');
var startBtn=document.getElementById('startBtn');
var startPage=document.getElementById('startPage');
var loser=document.getElementById('loser');
var close=document.getElementById('close');
var slideBtn=document.getElementById('slideBtn');
var snakeMove;
var speed=200;
var heardScore=document.getElementById('heardScore');
var loserScore=document.getElementById('loserScore');
var x=document.getElementById('x');
var on=true;     
var off=true;

init();
function init(){
	//地图区域
	mapW=parseInt(getComputedStyle(content).width);
	mapH=parseInt(getComputedStyle(content).height);
	mapDiv=content;

	//食物区
	foodW=20;
	foodH=20;
	foodX=0;     //坐标属性表示 ； 距离*20 
	foodY=0;

	//蛇
	snakeW=20;
	snakeH=20;
	snakeBody=[[3,1,'heard'],[2,1,'body'],[1,1,'body']]; //蛇身增长，直接插入数组后面

	//分数
	score=0;

	//游戏属性
	direct='right';
	this.left=false;
	this.right=false;
	this.up=true;
	this.down=true;
}

function gameStart(){
	startPage.style.display='none';
	slideBtn.style.display='block';
	food();
	snake();
	
}

function food(){
	var food = document.createElement('div');   //动态创建 '食物'
	food.style.width = foodW + 'px';
	food.style.height = foodH + 'px';
	foodX =Math.floor((mapW/20)*Math.random());   //随机横向坐标 n单位
	foodY = Math.floor((mapH/20)*Math.random());   //随机纵向坐标 m单位
	food.style.left = foodX*20 + 'px';
	food.style.top = foodY*20 + 'px';
	food.style.position = 'absolute';
	mapDiv.appendChild(food).setAttribute('class','food');
}


function snake(){                              //蛇头；后面继承蛇头
	for(var i=0; i<snakeBody.length; i++){
		var snake=document.createElement('div');   //有一节‘s蛇’就生成一个div
		snake.style.width=snakeW + 'px';
		snake.style.height=snakeH + 'px';
		snake.style.position='absolute';
		
		snake.style.left=snakeBody[i][0]*20 + 'px';
		snake.style.top=snakeBody[i][1]*20 + 'px';

		snake.classList.add(snakeBody[i][2]);
		mapDiv.appendChild(snake).classList.add('snake');
	}

		switch(direct){
			case 'right':
			break;
			case 'left':
			snake.style.transform= 'rotate(180deg)';
			break;
			case 'up':
			snake.style.transform= 'rotate(270deg)';
			break;
			case 'down':
			snake.style.transform= 'rotate(90deg)';
			break;

		}
}



function move(){
	for(var i=snakeBody.length-1; i>0; i--){
		snakeBody[i][0] = snakeBody[i-1][0];
		snakeBody[i][1] = snakeBody[i-1][1];
	}
	switch(direct){      //假设现在有方向direct;
		case 'left':
		snakeBody[0][0] -=1;
		break;
		case 'up':
		snakeBody[0][1] -=1;
		break;
		case 'right':
		snakeBody[0][0] +=1;
		break;
		case 'down':
		snakeBody[0][1] +=1;
		break;
		default:
		break;
	}
	removeClass('snake');
	snake();

	if(snakeBody[0][0]==foodX && snakeBody[0][1]==foodY){
		var snakeEndX = snakeBody[snakeBody.length-1][0];
		var snakeEndY = snakeBody[snakeBody.length-1][1];
		switch(direct){      //假设现在有方向direct;
		case 'left':
		snakeBody.push([snakeEndX+1,snakeEndY,'body'])
		break;
		case 'up':
		snakeBody.push([snakeEndX,snakeEndY+1,'body'])
		break;
		case 'right':
		snakeBody.push([snakeEndX-1,snakeEndY,'body'])
		break;
		case 'down':
		snakeBody.push([snakeEndX,snakeEndY-1,'body'])
		break;
		default:
		break;
		}
		score+=1;
		heardScore.innerHTML=score;
		removeClass('food');
		food();
	}

	if(snakeBody[0][0]<0 || snakeBody[0][0]>mapW/20){
		reloadGame()   //重新加载内容
	
	}
	if(snakeBody[0][1]<0 || snakeBody[0][1]>mapH/20){
		reloadGame()
	}
	for(var i=1; i<snakeBody.length; i++){
		if(snakeBody[0][0]==snakeBody[i][0] &&snakeBody[0][1]==snakeBody[i][1]){
			reloadGame()
		}
	}

		
}



function reloadGame(){
	removeClass('snake');
	removeClass('food');
	clearInterval(snakeMove);
	snakeBody=[[3,1,'heard'],[2,1,'body'],[1,1,'body']];

	direct='right';
	this.left=false;
	this.right=false;
	this.up=true;
	this.down=true;
	
	loserScore.innerHTML=score;
	score=0;
	heardScore.innerHTML=score;
	loser.style.display='block';
	on=true;
	off=true;
	slideBtn.setAttribute('src','img/btn_off.png')

}

function removeClass(name){
	var ele=document.getElementsByClassName(name);
	while(ele.length>0){
		ele[0].parentNode.removeChild(ele[0]);
	}
}

function setDirect(code){
	switch(code){           
		case 37:
		if(this.left){         //判断方向是否需要改变；如果是原来的状态则不需要改变
			direct = 'left';
			this.left = false;
			this.right = false;
			this.up = true;
			this.down = true;
		}
		break;
		case 38:
		if(this.up){
			direct = 'up';
			this.left = true;
			this.right = true;
			this.up= false;
			this.down = false;
		}
		break;
		case 39:
		if(this.right){
			direct = 'right';
			this.left = false;
			this.right = false;
			this.up= true;
			this.down = true;
		}
		break;
		case 40:
		if(this.down){
			direct = 'down';
			this.left = true;
			this.right = true;
			this.up= false;
			this.down = false;
		}
		default:
		break;
	}
}

function bindEvent(){
	x.onclick=function(){
		loser.style.display= 'none'
	}

	startBtn.onclick=function(){       // 最开始的位置
		startAndPaush()
	}

	slideBtn.onclick=function(){

		startAndPaush()
	}
}
bindEvent();

function startAndPaush(){
	if(off){                 //没有暂停游戏
		if(on){            //可以开始游戏
			gameStart();
			on=false;
			}
		snakeMove=setInterval(function(){
			move()
			},speed)
		slideBtn.setAttribute('src','img/btn_on.png');
		document.onkeydown = function(e){
		var code = e.keyCode;          //把数字传进去
		setDirect(code) 
		}
		
		off=false;
	}else{
		slideBtn.setAttribute('src','img/btn_off.png');
		clearInterval(snakeMove)
		document.onkeydown = function(e){
		e.returnValue=false;
		return false;
		}
		off=true;
	}
	
}