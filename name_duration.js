// Music exercises for "MUUSIKA KOMPOSITSIOONIÕPETUS"
// TODO: proper credits, copyright

 
// harjutus 1.2.2 "Helivältus. Kirjuta helivältuse nimetus. Antud on helivältus noodikirja märgina (noot või paus). Kirjuta helivältuse nimetus"

function nameDuration() {		
		// variables
	var duration = -1;
	var answered = false;
	
	// Create or set necessary HTML elements
	document.getElementById("exerciseTitle").innerHTML = "Määra helivältus";
	document.getElementById("description").innerHTML = "Antud on helivältus noodikirja märgina (noot või paus). Leia,  mis vältus see on"; 
	document.getElementById("question").innerHTML =	"Mis vältus see on?";

	var response = document.createElement("select");
	response.id = "response";
	response.innerHTML ='<option value="0" selected>----</option>' +
		'<option value="2">Poolnoot/-paus</option>' +
		'<option value="1">Veerandnoot/-paus</option>' +
		'<option value="0.5">Kaheksandik</option>' +
		'<option value="0.25">Kuueteistkümnendik</option>';		
	document.getElementById("responseDiv").appendChild(response);
	
	// set necessary methods in exercise
	exercise = new MusicExercise("mainCanvas", 100); // relatively narrow canvas // CAN THIS BE A MEMORY LEAK?
	//exercise.attempts = 0; exercise.score = 0; // set in object create 
	exercise.time = ""; // no time signature

	document.getElementById("attempts").innerHTML = "0";
	document.getElementById("score").innerHTML = "0";
	
	
	exercise.generate = function() {
		var allowedDurations = [2, 1, 0.5, 0.25];
		var tryThis = allowedDurations[Math.floor(Math.random()*allowedDurations.length)];
		while (tryThis === duration) { // to avoid getting the same duration twice in a row
			console.log("Got the same, retrying");
			tryThis = allowedDurations[Math.floor(Math.random()*allowedDurations.length)];
		}
		duration = tryThis; 
		var flexDuration = (4/duration).toString();
		var isRest = ( Math.random() >=0.5 ); // 50/50% if notr or rest
		console.log("show rest: ", isRest);
		
		// create VexFlow string of notes
		
		var parseString = " :"+flexDuration ;
		parseString += (isRest) ?  " ##" : " B/4"; // add rest or note (B) 
		
		console.log("Generated notes: ", parseString);
		exercise.notes = parseString;
		answered = false; // necessary to set a flag to check if the quetion has answered already in checkResponse
	
	}
	
	exercise.generate();		
	exercise.draw();
	
	document.getElementById("renewButton").onclick = function() {
		exercise.generate(); 
		exercise.draw();
	}
	
	exercise.checkResponse = function() { // TODO: - kas oleks võimalik tõsta baseclassi? Siis vist switch case peaks olema välditud ja õige vastus peaks olema juba loetava stringina nagu "poolnoot" - vist mõtekas. Samas, kuidas basclass tead html elementide ID-sid???// Music exercises for "MUUSIKA KOMPOSITSIOONIÕPETUS"
// TODO: proper credits, copyright

		//TODO: kontrolli, kas uuendatud, muidu tõstab ainult skoori...
		if (answered) {
			alert('Sa oled juba vastanud. Vajuta "Uuenda"');
			return;
		}
		exercise.attempts += 1;
		var feedback = "";
		if (parseFloat(document.getElementById("response").value)===duration) {
			feedback = "Õige!"
			exercise.score += 1;
		} else {
			var durationString = "";
			switch (duration) {
				case 2:  durationString = "Poolnoot"; break;
				case 1:  durationString = "Veerandnoot"; break;
				case 0.5:  durationString = "Kaheksandik"; break;
				case 0.25:  durationString = "Kuueteistkümnendik"; break;
				default: durationString = "?"; break;
			}
			feedback = "Vale! Õige oli: "+durationString; 
		}
		
		
		document.getElementById("attempts").innerHTML = exercise.attempts;
		document.getElementById("score").innerHTML = exercise.score;
		document.getElementById("feedback").innerHTML = feedback; 
		exercise.draw(); // redraw without rectangle
		answered = true;
	
	}
		
}
