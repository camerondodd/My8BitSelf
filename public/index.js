const statsURL='/profile/stats';

// Gets user info
function getStats(callback){
	settings={
		method:'GET',
		dataType:'json',
		url:statsURL,
		success:callback
	};
	$.ajax(settings);
	console.log('getStats ran');
}

//Makes info useable for rest of file
function displayStats(data){
	console.log(data);
	id = `${data.user._id}`;
	$('.avatarContainer').html(`
		<img class="avatarImg" src="${data.user.avatar}" alt="avatar"/>
	`);
	statsURLDel = `/profile/stats/${id}`;
	Cusername = data.user.username;
	Cavatar = `${data.user.avatar}`;
	Cclass = data.user.class;
	Clevel = data.user.level;
	Cxp = data.user.xp;
	Cstr = data.user.strPts;
	Sstr = data.user.strS;
	Cagi = data.user.agiPts;
	Sagi = data.user.agiS;
	Cvit = data.user.vitPts;
	Svit = data.user.vitS;
	Cint = data.user.intPts;
	Sint = data.user.intS;
	Cwsd = data.user.wsdPts;
	Swsd = data.user.wsdS;
	Cchr = data.user.chrPts;
	Schr = data.user.chrS;
	characterPage();	
}

// Renders stats on profile
function characterPage(){
	Pxp=(Cxp/10)*100;
	levelUp();
	$('.statsContainer').html(`
		<h2>${Cusername} the ${Cclass}</h2>
		<h3>Level: ${Clevel}</h3>
		<h3>Experience: ${Cxp}/10</h3>
		<div class="xpHolder">
    		<div class="xpBar" style="width:${Pxp}%">
    			<p>${Pxp}%</p>
    		</div>
  		</div>
		<div class="statColumn">
			<h4>STR: ${Sstr}</h4>
			<h4>AGI: ${Sagi}</h4>
			<h4>VIT: ${Svit}</h4>
		</div>
		<div class="statColumn">
			<h4>INT: ${Sint}</h4>
			<h4>WSD: ${Swsd}</h4>
			<h4>CHR: ${Schr}</h4>			
		</div>
`)}

// Levels character when xp hits certain point
function levelUp(){
	if(Cxp>=10){
		Clevel++;
		Cxp=0;
		Rstr=Math.round(Cstr/5);
			Sstr = 1 + Rstr;
		Ragi=Math.round(Cagi/5);
			Sagi = 1 + Ragi;
		Rvit=Math.round(Cvit/5);
			Svit = 1 + Rvit;
		Rint=Math.round(Cint/5);
			Sint = 1 + Rint;
		Rwsd=Math.round(Cwsd/5);
			Swsd = 1 + Rwsd;
		Rchr=Math.round(Cchr/5);
			Schr = 1 + Rchr;
		putStat();
	}
	else{
	  	console.log(`${Cxp}/10`)
	}
}

getStats(displayStats);

 
// Brings up del page
function delAccButton(){
 	$('.delAcc').on('click','.delAccButton', function(){
 		console.log('delAcc button pressed');
 		$('.columnContainer').toggle();
		$('.areYouSure').prop('hidden',false);
 	})
}

// Doesn't delete account
function delNo(){
	$('.areYouSure').on('click','.delNo',function(){
		console.log('delAcc button pressed');
 		$('.columnContainer').toggle();
		$('.areYouSure').prop('hidden',true);
	})
}

// Redirects to login and runs delAcc
function delYes(){
	$('.areYouSure').on('click','.delYes',function(){
		console.log('delYes button pressed');
 		window.location.replace('/auth/login');
 		delAcc();
	})
}

// Deletes account
function delAcc(){
	settings={
		method:'DELETE',
		dataType:'json',
		url:statsURLDel
	}
	$.ajax(settings);
	console.log('delAcc ran');
}

// Buttons to record particular stats and grant xp
function strButton(){
	$('.adventureButtons').on('click','.strButton', function(){
		console.log('Strength Adventure!');
		Cstr++;
		Cxp++;
		putStat();
	})
}

function agiButton(){
	$('.adventureButtons').on('click','.agiButton', function(){
		console.log('Agility Adventure!'+Cagi);
		Cagi++;
		Cxp++;
		putStat();
	})
}

function vitButton(){
	$('.adventureButtons').on('click','.vitButton', function(){
		console.log('Vitality Adventure!');
		Cvit++;
		Cxp++;
		putStat();
	})
}

function intButton(){
	$('.adventureButtons').on('click','.intButton', function(){
		console.log('Int Adventure!');
		Cint++;
		Cxp++;
		putStat();
	})
}

function wsdButton(){
	$('.adventureButtons').on('click','.wsdButton', function(){
		console.log('Wisdom Adventure!');
		Cwsd++;
		Cxp++;
		putStat();
	})
}

function chrButton(){
	$('.adventureButtons').on('click','.chrButton', function(){
		console.log('Charisma Adventure!');
		Cchr++;
		Cxp++;
		putStat();
	})
}

// Change username
function usernameSubmit(){
	$('.updateUsername').submit(event => {
    event.preventDefault();
    const queryTarget=$(event.currentTarget).find('.usernameInput');
    Cusername=queryTarget.val();
    queryTarget.val('');
    putStat();
    var time=100;
	window.setTimeout(function(){
		window.location.replace('/profile');
	}, time);
})}

// Change class
function classSubmit(){
$('.updateClass').submit(event => {
    event.preventDefault();
    const queryTarget=$(event.currentTarget).find('.classInput');
    Cclass=queryTarget.val();
    queryTarget.val('');
    putStat();
    var time=100;
		window.setTimeout(function(){
		window.location.replace('/profile');
	}, time);
})}

// Updates account with info from buttons
function putStat(){
	settings={
		method:'PUT',
		dataType:'json',
		url:statsURLDel,
		data:{
			"id":id,
			"username":Cusername,
			"class":Cclass,
			"avatar":Cavatar,
			"level":Clevel,
			"xp":Cxp,
			"strPts":Cstr,
			"strS":Sstr,
			"agiPts":Cagi,
			"agiS":Sagi,
			"vitPts":Cvit,
			"vitS":Svit,
			"intPts":Cint,
			"intS":Sint,
			"wsdPts":Cwsd,
			"wsdS":Swsd,
			"chrPts":Cchr,
			"chrS":Schr
		}
	}
	console.log(settings);
	$.ajax(settings);
	console.log('putStat ran');
	getStats(displayStats);
	var time=200;
	window.setTimeout(advResults(), time);
}

// Reports results of adventure
 function advResults(){
 	if(Cxp>=100){
 		$('.advResults').html(`
 		<h1>Adventure Logged!</h1>
 		<h2>Leveled Up!</h2>
 		`);
 		$('.adventureButtons').prop('hidden',true);
 		$('.levelContainer').prop('hidden',false);

 	}
 	else{
 		$('.advResults').html(`
 		<h1>Adventure Logged!</h1>
 		<h2>Experience +1</h2>
 		`);
 		$('.adventureButtons').prop('hidden',true);
 		$('.advResultsContainer').prop('hidden',false);
 }}

// Allows multiple adventures to be logged
function anotherButton(){
	$('.advResultsContainer').on('click','.anotherButton', function(){
		$('.advResultsContainer').prop('hidden',true);
		
	 	var time=200;
	 	window.setTimeout(function(){
	 	$('.advResultsContainer').prop('hidden',true);	 	
	 	 window.location.reload(true);
	  }, time);
	})
}

// Returns to profile
function doneButton(){
	$('.advResultsContainer').on('click','.doneButton',function(){
		var time=200;
		window.setTimeout(function(){
		window.location.replace('/profile');
	}, time);	
	})
}

//Returns to profile
function levelButton(){
	$('.levelContainer').on('click','.levelButton',function(){
		var time=200;
		window.setTimeout(function(){
		window.location.replace('/profile');
	}, time);	
	})
}

// Function runner
function functionRunner(){
	delAccButton();
	delYes();
	delNo();
	strButton();
	agiButton();
	vitButton();
	intButton();
	wsdButton();
	chrButton();
	usernameSubmit();
	classSubmit();
	anotherButton();
	doneButton();
	levelButton();
}

$(functionRunner);