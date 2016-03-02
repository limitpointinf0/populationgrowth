var population = [];
var counter = 0;
var deaths = 0;

function sprite(number,gender,age,lifespan,attractive,standards){
	this.number = number;
	this.gender = gender;
	this.age = age;
	this.lifespan = lifespan;
	this.attractive = attractive;
	this.standards = standards;
}
sprite.prototype.getOlder = function(){
	this.age++;
};




function makeSprite(){
	var gen = Math.random() > 0.5 ? "male":"female";
	var lifspan = Math.floor((Math.random() * 40) + 40) ;
	var attr = Math.floor((Math.random()*3) + 1 );
	var stnd = Math.floor((Math.random()*3) + 1 );
	var p = new sprite(counter, gen, 0, lifspan, attr, stnd);
	population.push(p);
	counter++;
	console.log("sprite was born");
}

function getOlder(){
	for(i = 0; i < population.length; i++){
			population[i].getOlder();
			if(population[i].age > population[i].lifespan){
				population.splice(i,1);
				deaths++;
				console.log("Number " + i + " has died.")
			}
	}
}

function findMate(){
	for(var i=0; i < population.length; i++){
		if(population[i].age < 45 && population[i].age > 18){
				var indx = Math.floor(Math.random()*population.length);	
				if((population[indx].age<45) &&(population[i].age > 18) && (population[indx].gender!=population[i].gender) && (population[indx].attractive >= population[i].standards)){
					var answer = false;
					switch(population[i].attractive){
						case 1: answer = Math.random()*4 < 1 ? true : false;
							break;
						case 2: answer = Math.random()*4< 2 ? true : false;
							break;
						case 3: answer = Math.random()*4<3 ? true : false;
							break;
						default: 
							console.log("nothing happened")
					}
					if(answer){ makeSprite(); } 
				}
		}
	}
}

function Main(){
	getOlder();
	findMate();
	document.getElementById("numbers").innerHTML = population.length;
	var message = JSON.stringify(population);
	document.getElementById("population").innerHTML = message;
	document.getElementById("deaths").innerHTML = deaths;
}


makeSprite();
makeSprite();
var possibility = false;
while(!possibility){
	if(population[0].gender == population[1].gender){
		console.log("impossible society. trying again...");
		counter = 0;
		population = [];
		makeSprite();
		makeSprite();
		(population[0].gender == population[1].gender) ? possibility = false : possibility = true;
	}
	if(population[0].gender != population[1].gender){
		console.log("possible society");
		possibility = true;
	}
}

setInterval("Main()",1000);







