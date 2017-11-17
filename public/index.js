const statsURL='/profile/stats';

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

function displayStats(data){
	console.log(data);
	id = `${data.user._id}`;
	$('.avatarContainer').html(`
		<img class="avatarImg" src="${data.user.avatar}"/>
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

function levelUp(){
	if(Cxp>=10){
		Clevel++;
		Cxp=0;
		if(Cstr%5===0)
			Sstr = 1 + (Cstr/5);
		if(Cagi%5===0)
			Sagi = 1 + (Cagi/5);
		if(Cvit%5===0)
			Svit = 1 + (Cvit/5);
		if(Cint%5===0)
			Sint = 1 + (Cint/5);
		if(Cwsd%5===0)
			Swsd = 1 + (Cwsd/5);
		if(Cchr%5===0)
			Schr = 1 + (Cchr/5);
		putStat();
	}
	else{
	  	console.log(`${Cxp}/10`)
	}
}

getStats(displayStats);

 

function delAccButton(){
 	$('.delAcc').on('click','.delAccButton', function(){
 		console.log('delAcc button pressed');
 		$('.columnContainer').toggle();
		$('.areYouSure').prop('hidden',false);
 	})
}

function delNo(){
	$('.areYouSure').on('click','.delNo',function(){
		console.log('delAcc button pressed');
 		$('.columnContainer').toggle();
		$('.areYouSure').prop('hidden',true);
	})
}

function delYes(){
	$('.areYouSure').on('click','.delYes',function(){
		console.log('delYes button pressed');
 		window.location.replace('/auth/login');
 		delAcc();
	})
}

function delAcc(){
	settings={
		method:'DELETE',
		dataType:'json',
		url:statsURLDel
	}
	$.ajax(settings);
	console.log('delAcc ran');
}

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
	var time=10;
	window.setTimeout(advResults(), time);
}

 function advResults(){
 	if(Cxp>=10){
 		$('.advResults').html(`
 		<h1>Adventure Logged!</h1>
 		<h2>Leveled Up!</h2>
 		`);
 		// $('.adventureButtons').toggle();
 		$('.adventureButtons').prop('hidden',true);
 		$('.levelContainer').prop('hidden',false);

 	}
 	else{
 		$('.advResults').html(`
 		<h1>Adventure Logged!</h1>
 		<h2>Experience +1</h2>
 		`);
 		// $('.adventureButtons').toggle();
 		$('.adventureButtons').prop('hidden',true);
 		$('.advResultsContainer').prop('hidden',false);
 }}

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

function doneButton(){
	$('.advResultsContainer').on('click','.doneButton',function(){
		var time=200;
		window.setTimeout(function(){
		window.location.replace('/profile');
	}, time);	
	})
}

function levelButton(){
	$('.levelContainer').on('click','.levelButton',function(){
		// levelUp();
		var time=200;
		window.setTimeout(function(){
		window.location.replace('/profile');
	}, time);	
	})
}

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