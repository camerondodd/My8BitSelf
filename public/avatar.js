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

// Displays user info
function displayStats(data){
	console.log(data);
	id = `${data.user._id}`;
	$('.statsContainer').html(
		`<p> ${data.user.username} </p>`
	);
	$('.avatarContainer').html(`
		<img src="${data.user.avatar}"/>
	`);
	statsURLDel=`/profile/stats/${id}`;
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
}

getStats(displayStats);

// Button commands for changing avatars
function oneButton(){
	$('.box').on('click','.oneButton', function(){
		console.log('oneButton clicked');
		Cavatar="../1.jpg";
		putAvatar();
	})
}

function twoButton(){
	$('.box').on('click','.twoButton', function(){
		console.log('twoButton clicked');
		Cavatar="../2.jpg";
		putAvatar();
	})
}

function threeButton(){
	$('.box').on('click','.threeButton', function(){
		console.log('threeButton clicked');
		Cavatar="../3.jpg";
		putAvatar();
	})
}

function fourButton(){
	$('.box').on('click','.fourButton', function(){
		console.log('fourButton clicked');
		Cavatar="../4.jpg";
		putAvatar();
	})
}

function fiveButton(){
	$('.box').on('click','.fiveButton', function(){
		console.log('fiveButton clicked');
		Cavatar="../5.jpg";
		putAvatar();
	})
}

function sixButton(){
	$('.box').on('click','.sixButton', function(){
		console.log('sixButton clicked');
		Cavatar="../6.jpg";
		putAvatar();
	})
}

function sevenButton(){
	$('.box').on('click','.sevenButton', function(){
		console.log('sevenButton clicked');
		Cavatar="../7.jpg";
		putAvatar();
	})
}

function eightButton(){
	$('.box').on('click','.eightButton', function(){
		console.log('eightButton clicked');
		Cavatar="../8.jpg";
		putAvatar();
	})
}

function nineButton(){
	$('.box').on('click','.nineButton', function(){
		console.log('nineButton clicked');
		Cavatar="../9.jpg";
		putAvatar();
	})
}

function tenButton(){
	$('.box').on('click','.tenButton', function(){
		console.log('tenButton clicked');
		Cavatar="../10.jpg";
		putAvatar();
	})
}

function elevenButton(){
	$('.box').on('click','.elevenButton', function(){
		console.log('elevenButton clicked');
		Cavatar="../11.jpg";
		putAvatar();
	})
}

function twelveButton(){
	$('.box').on('click','.twelveButton', function(){
		console.log('twelveButton clicked');
		Cavatar="../12.jpg";
		putAvatar();
	})
}

function thirteenButton(){
	$('.box').on('click','.thirteenButton', function(){
		console.log('thirteenButton clicked');
		Cavatar="../13.jpg";
		putAvatar();
	})
}

function fourteenButton(){
	$('.box').on('click','.fourteenButton', function(){
		console.log('fourteenButton clicked');
		Cavatar="../14.jpg";
		putAvatar();
	})
}

function fifteenButton(){
	$('.box').on('click','.fifteenButton', function(){
		console.log('fifteenButton clicked');
		Cavatar="../15.jpg";
		putAvatar();
	})
}

function sixteenButton(){
	$('.box').on('click','.sixteenButton', function(){
		console.log('sixteenButton clicked');
		Cavatar="../16.jpg";
		putAvatar();
	})
}

// Takes info from buttons and updates avatar
function putAvatar(){
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
	console.log('putAvatar ran');
	var time=10;
	window.setTimeout(function(){
		window.location.replace('/profile');
	}, time);
}

// Function runner
function functionRunner(){
	oneButton();
	twoButton();
	threeButton();
	fourButton();
	fiveButton();
	sixButton();
	sevenButton();
	eightButton();
	nineButton();
	tenButton();
	elevenButton();
	twelveButton();
	thirteenButton();
	fourteenButton();
	fifteenButton();
	sixteenButton();
}

$(functionRunner);