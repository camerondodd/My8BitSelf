// const aURL='/profile/stats';

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
	$('.statsContainer').html(
		`<p> ${data.user.username} </p>`
	);
	$('.avatarContainer').html(`
		<img src="${data.user.avatar}"/>
	`);
	statsURLDel=`/profile/stats/${id}`;
	Cusername=data.user.username;
	Cclass = data.user.class;
	Cstr = data.user.strPts;
	Cagi = data.user.agiPts;
	Cvit = data.user.vitPts;
	Cint = data.user.intPts;
	Cwsd = data.user.wsdPts;
	Cchr = data.user.chrPts;
	Cavatar = `${data.user.avatar}`;
}

getStats(displayStats);

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

function putAvatar(){
	settings={
		method:'PUT',
		dataType:'json',
		url:statsURLDel,
		data:{
			"id":id,
			"username":Cusername,
			"avatar":Cavatar,
			"class":Cclass,
			"strPts":Cstr,
			"agiPts":Cagi,
			"vitPts":Cvit,
			"intPts":Cint,
			"wsdPts":Cwsd,
			"chrPts":Cchr
		}
	}
	console.log(settings);
	$.ajax(settings);
	console.log('putAvatar ran');
}

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
}

$(functionRunner);