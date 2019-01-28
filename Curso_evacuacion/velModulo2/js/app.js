var centesimas = 0;
	var segundos = 0;
	var minutos = 0;
	var horas = 0;

	var video = document.createElement("video");
    var canvasElement = document.getElementById("canvas");
    var canvas = canvasElement.getContext("2d");

    var startingTime;
var lastTime;
var totalElapsedTime;
var elapsedSinceLastLoop;

var currentQr;
var canScan;

TweenMax.fromTo($("#initImage"),1,{scale:0,alpha:0},{scale:1,alpha:1,ease:Back.easeOut});
	TweenMax.fromTo($("#initText1"),1,{x:-250,alpha:0},{x:0,alpha:1,ease:Back.easeOut,delay:1.5});
	TweenMax.fromTo($("#initText2"),1,{x:-250,alpha:0},{x:0,alpha:1,ease:Back.easeOut,delay:3});
	TweenMax.fromTo($("#initText3"),1,{x:-250,alpha:0},{x:0,alpha:1,ease:Back.easeOut,delay:4.5});
	TweenMax.fromTo($("#buttonInit"),1,{alpha:0},{alpha:1,ease:Back.easeOut,delay:6});



function clickInit(){

	navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.mediaDevices.getUserMedia);

  	navigator.getUserMedia({ video: {
             facingMode: 'environment'
         } ,audio: false},gotStream,noStream);

  	document.getElementById("initDiv").style.display = "none";
  	document.getElementById("qrDiv").style.display = "block";
}

function clickRetro(){
	if(currentQr<5){
		document.getElementById("qrDiv").style.display = "block";
		document.getElementById("retroDiv").style.display = "none";
		/*document.getElementById("dataContainer").style.display = "block";
		document.getElementById("data").style.display = "none";
		document.getElementById("finalText").style.display = "block";
		document.getElementById("buttonOpen").style.display = "block";
		document.getElementById("buttonClose").style.display = "block";*/
	}
	else{
		canScan = true;
		document.getElementById("retroDiv").style.display = "none";
      	//document.getElementById("finishDiv").style.display = "block";
      	document.getElementById("timeFinishData").innerHTML = "Tiempo: "+ timeData.innerHTML;
      	document.getElementById("distanceFinishData").innerHTML = "Distancia: "+document.getElementById("distanceData").innerHTML;
      	document.getElementById("velocityFinishData").innerHTML = "Velocidad: "+document.getElementById("velocityData").innerHTML;
      	/*TweenMax.fromTo($("#finishImage"),1,{scale:0,alpha:0},{scale:1,alpha:1,ease:Back.easeOut});
		TweenMax.fromTo($("#finishText1"),1,{x:-250,alpha:0},{x:0,alpha:1,ease:Back.easeOut,delay:1});
		TweenMax.fromTo($("#finishText2"),1,{x:-250,alpha:0},{x:0,alpha:1,ease:Back.easeOut,delay:2});
		TweenMax.fromTo($("#tiempoFinish"),1,{x:-250,alpha:0},{x:0,alpha:1,ease:Back.easeOut,delay:3});
		TweenMax.fromTo($("#distanciaFinish"),1,{x:-250,alpha:0},{x:0,alpha:1,ease:Back.easeOut,delay:4});
		TweenMax.fromTo($("#buttonFinish"),1,{alpha:0},{alpha:1,ease:Back.easeOut,delay:6});*/

		document.getElementById("dataContainer").style.display = "block";
		document.getElementById("data").style.display = "none";
		document.getElementById("finalText").style.display = "block";
		document.getElementById("buttonOpen").style.display = "block";
		document.getElementById("buttonClose").style.display = "block";

	}
}

 function gotStream(stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.play();
      requestAnimationFrame(tick);
    }

    function noStream(){
      alert("no stream");
    }

    function tick() {
    	if(canScan){
    	if(!startingTime){startingTime=Date.now();}
	  if(!lastTime){lastTime=Date.now();}
	  totalElapsedTime=(Date.now()-startingTime);
	  //elapsedSinceLastLoop=(currentTime-lastTime);
	  

	  var sec = "0";
	  var min ="0";
	  var timeTransform = Math.round(totalElapsedTime/1000);

	  if(timeTransform >=60 ){
	  	min = Math.round(timeTransform/60);
	  	if(min <10){
	  		min = "0"+min;
	  	}
	  	timeTransform -= (min*60);
	  }
	  else{

	  	min = "00";
	  }

	  if(timeTransform<10){
	  	sec = "0"+timeTransform;
	  }
	  else{
	  	sec = timeTransform;
	  }



	  timeData.innerHTML = min+":"+sec;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {

        canvasElement.hidden = false;

        /*canvasElement.width = window.innerWidth;
        canvasElement.height = (video.videoHeight*window.innerWidth)/video.videoWidth;*/

        canvasElement.height = window.innerHeight;
        canvasElement.widthi = (video.width*window.innerHeight)/video.videoHeight
        ;

        //canvasElement.height = video.videoHeight;
        //canvasElement.width = video.videoWidth;

        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          //alert(code.data)
          if(currentQr == 0 && code.data == "Yssue_m2_1"){
          	document.getElementById("dataContainer").style.display = "none";
          	document.getElementById("retroDiv").style.display = "block";
          	currentQr = 1;
          	canScan = false;
          	document.getElementById("qr").src = "qrs/Yssue_m2_2.png";
          	document.getElementById("qrWrong").src = "qrs/Yssue_m2_2.png";
          	document.getElementById("retroImage").src = "qrs/Yssue_m2_1.png";
          	document.getElementById("retroText").innerHTML = "<h1>Primera señalización escaneada</h1>";

          }
          else if(currentQr == 1 && code.data == "Yssue_m2_2"){
          	document.getElementById("dataContainer").style.display = "none";
          	document.getElementById("retroDiv").style.display = "block";
          	currentQr = 2;
          	canScan = false;
          	document.getElementById("qr").src = "qrs/Yssue_m2_3.png";
          	document.getElementById("qrWrong").src = "qrs/Yssue_m2_3.png";
          	document.getElementById("retroImage").src = "qrs/Yssue_m2_2.png";
          	document.getElementById("qrR"+(currentQr-1)).style.opacity = 1;
          	document.getElementById("retroText").innerHTML = "<h1>Segunda señalización escaneada</h1>";
          }
          else if(currentQr == 2 && code.data == "Yssue_m2_3"){
          	document.getElementById("dataContainer").style.display = "none";
          	document.getElementById("retroDiv").style.display = "block";
          	currentQr = 3;
          	canScan = false;
          	document.getElementById("qr").src = "qrs/Yssue_m2_4.png";
          	document.getElementById("qrWrong").src = "qrs/Yssue_m2_4.png";
          	document.getElementById("retroImage").src = "qrs/Yssue_m2_3.png";
          	document.getElementById("qrR"+(currentQr-1)).style.opacity = 1;
          	document.getElementById("retroText").innerHTML = "<h1>Tercera señalización escaneada</h1>";
          }
          else if(currentQr == 3 && code.data == "Yssue_m2_4"){
          	document.getElementById("dataContainer").style.display = "none";
          	document.getElementById("retroDiv").style.display = "block";
          	currentQr = 4;
          	canScan = false;
          	document.getElementById("qr").src = "qrs/Yssue_m2_5.png";
          	document.getElementById("qrWrong").src = "qrs/Yssue_m2_5.png";
          	document.getElementById("retroImage").src = "qrs/Yssue_m2_4.png";
          	document.getElementById("qrR"+(currentQr-1)).style.opacity = 1;
          	document.getElementById("retroText").innerHTML = "<h1>Cuarta señalización escaneada</h1>";
          }
          else if(currentQr == 4 && code.data == "Yssue_m2_5"){

          	document.getElementById("dataContainer").style.display = "none";
          	document.getElementById("retroDiv").style.display = "block";
          	currentQr = 5;
          	canScan = false;
          	document.getElementById("qr").src = "qrs/Yssue_m2_5.png";
          	document.getElementById("qrWrong").src = "qrs/Yssue_m2_5.png";
          	document.getElementById("retroImage").src = "qrs/Yssue_m2_5.png";
          	document.getElementById("qrR"+(currentQr-1)).style.opacity = 1;
          	document.getElementById("retroText").innerHTML = "<h1>Quinta señalización escaneada</h1>";

          	//canScan = false;
          	
          }
          else {

          	canScan = false;
          	document.getElementById("dataContainer").style.display = "none";
          	document.getElementById("wrongDiv").style.display = "block";
          }
        }
      }
  	}
  	lastTime=Date.now();
      requestAnimationFrame(tick);
    }

    function clickFoundQr(){
    	canScan = true;
    	document.getElementById("qrDiv").style.display = "none";
    	document.getElementById("dataContainer").style.display = "block";
    }

    function clickWrongQr(){
    	canScan = true;
    	document.getElementById("wrongDiv").style.display = "none";
    	document.getElementById("dataContainer").style.display = "block";
    }

    function clickFinish(){

    }

    function clickSi(){
    	document.getElementById("buttonOpen").style.display = "none";
    	document.getElementById("buttonClose").style.display = "none";
    	document.getElementById("finalText").style.display = "none";
    	document.getElementById("dataContainer").style.display = "none";
    	document.getElementById("finishDiv").style.display = "block";
    }

    function clickNo(){
    	//document.getElementById("dataContainer").style.display = "none";
    	document.getElementById("buttonOpen").style.display = "none";
    	document.getElementById("buttonClose").style.display = "none";
    	document.getElementById("finalText").style.display = "none";
    	document.getElementById("buttonTakePhoto").style.display = "block";

    }

    function clickTakePhoto(){
    	canScan = false;
    	canvasElement.hidden = false;

        /*canvasElement.width = window.innerWidth;
        canvasElement.height = (video.videoHeight*window.innerWidth)/video.videoWidth;*/

        canvasElement.height = window.innerHeight;
        canvasElement.widthi = (video.width*window.innerHeight)/video.videoHeight;

        //canvasElement.height = video.videoHeight; 
        //canvasElement.width = video.videoWidth;

        //canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        //var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        document.getElementById("buttonTakePhoto").style.display = "none";
        document.getElementById("dataContainer").style.display = "none";
        document.getElementById("finishDiv").style.display = "block";

        var dt = canvas.toDataURL('image/png');


    }

$(function () {
	
	//var lock = window.navigator.requestWakeLock('screen');
	

  

    // Use facingMode: environment to attemt to get the front camera on phones
   

	var dessin, context;
	
	var podo_stepSize = localStorage.podo_stepSize || 50,
		podo_weight = localStorage.podo_weight || 70;
		podo_step = localStorage.podo_step || 0,
		podo_speed = localStorage.podo_speed || 0,
		podo_calory = localStorage.podo_calory || 0,
		isGPSEnabled = localStorage.isGPSEnabled || false;
		
	var podo = new Pedometer();
	
	var lang = new languageApp(window.navigator.language);
	
	//init pedometer
	podo.setCountStep(Math.round(podo_step));
	podo.setWeight(Math.round(podo_weight));
	podo.setStepSize(Math.round(podo_stepSize));
	podo.setMeanSpeed(Math.round(podo_speed*1000.)/1000.);
	podo.setCalory(Math.round(podo_calory*1000.)/1000.);
	podo.setIsGPSEnabled(Boolean(isGPSEnabled));
	
	var activatePodo = 1;
	var textActivate = lang.$pause;
	var timeFrame;
	//---------------
	// GPS event
	//---------------
	window.addEventListener("compassneedscalibration", function(event) {
		alert('Your compass needs calibrating! Wave your device in a figure-eight motion');
		event.preventDefault();
	}, true);

	window.onload = function(){
		currentQr = 0;
		canScan = false;
		//control = setInterval(cronometro,1);
		var h = (window.innerWidth*0.333)-30;
		$("#divR1").height(h);
		$("#divR2").height(h);
		$("#divR3").height(h);
		$("#divR4").height(h);
		$("#divR5").height(h);

		h = (window.innerWidth*0.7)-100;
		$("retroprincipal").height(h);
	}

	var timeData = document.getElementById("timeData");

	function cronometro () {
		timeFrame++;
		if (centesimas < 99) {
			centesimas++;

			//if (centesimas < 10) { centesimas = "0"+centesimas }
			//Centesimas.innerHTML = ":"+centesimas;
		}
		if (centesimas == 99) {
			centesimas = -1;
		}
		if (centesimas == 0) {
			segundos ++;
			if (segundos < 10) { segundos = "0"+segundos }
			//Segundos.innerHTML = ":"+segundos;
		}
		if (segundos == 59) {
			segundos = -1;
		}
		if ( (centesimas == 0)&&(segundos == 0) ) {
			minutos++;
			if (minutos < 10) { minutos = "0"+minutos }
			//Minutos.innerHTML = ":"+minutos;
		}
		if (minutos == 59) {
			minutos = -1;
		}
		if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
			horas ++;
			if (horas < 10) { horas = "0"+horas }
			//Horas.innerHTML = horas;
		}
		//if(horas==0){
			timeData.innerHTML = minutos+":"+segundos;
		//}
		//else{
		//	timeData.innerHTML = horas+":"+minutos+":"+segundos;
		//}

	}

	
	var norm     = 0;
	if (window.DeviceOrientationEvent) {
		window.addEventListener("devicemotion", function( event ) {
			if (activatePodo){
				if ((podo.acc_norm.length < 2) || (podo.stepArr.length < 2))
				{
					//$("#gamma-angle").html(Math.round(2/(event.interval/1000)));
					podo.createTable(Math.round(2/(event.interval/1000)));
				} else {
					norm = podo.computeNorm(event.accelerationIncludingGravity.x, event.accelerationIncludingGravity.y, event.accelerationIncludingGravity.z);
					podo.acc_norm.push(norm);
				
					podo.update();
				
					podo.onStep(podo.acc_norm);
					podo.onSpeed();
					podo.onCalory();
				
					//dessin  = document.querySelector('#canvas');
					//context = dessin.getContext('2d');
					//podo.onDraw(context, widthCanvas, heightCanvas);
				
					if ((localStorage.podo_step !== 0) && (isNaN(podo.countStep) == 0))
					{
						podo_step = localStorage.podo_step = podo.countStep;
					};
					if ((localStorage.podo_speed !== 0) && (isNaN(podo.meanSpeed) == 0))
					{
						podo_speed = localStorage.podo_speed = podo.meanSpeed;
					};
					if ((localStorage.podo_calory !== 0) && (isNaN(podo.calory) == 0))
					{
						podo_calory = localStorage.podo_calory = podo.calory;
					};
					
					if (isNaN(podo.distance) == 0){
						console.log(""+(Math.round(podo.distance/100)/1000))
						var di = (Math.round(podo.distance/100)/1000);
						timeFrame = totalElapsedTime/1000;
						$("#distanceData").html(di+" mts");
						var v = Math.round(di/timeFrame);
						$("#velocityData").html(v+" mts");
						timeFrame = 0;
						
					} else {
						$("#distanceData").html(0);
						$("#velocityData").html(0);
					};


					
				};
			};
		}, false);
	};
	
	
});


