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
	$('.statsContainer').html(
		`<p> ${data.user.username} </p>`
	);
	$('.avatarContainer').html(`
		<img src="${data.user.avatar}"/>
	`);
	statsURLDel=`/profile/stats/${id}`;
	Cstr = data.user.strPts;
	Cagi = data.user.agiPts;
	Cvit = data.user.vitPts;
	Cint = data.user.intPts;
	Cwsd = data.user.wsdPts;
	Cchr = data.user.chrPts;
	Cavatar = `${data.user.avatar}`;
}

getStats(displayStats);

// const logInURL = '/auth/login';

// function delReD(){
// 	settings={
// 		method:'GET',
// 		dataType:'json',
// 		url:logInURL,
// 	};
// 	$.ajax(settings);
// }

function delAccButton(){
 	$('.delAcc').on('click','.delAccButton', function(){
 	console.log('delAcc button pressed');
 	delAcc();
 	// delReD();
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
		putStat();
	})
}



function agiButton(){
	$('.adventureButtons').on('click','.agiButton', function(){
		console.log('Agility Adventure!');
		Cagi++;
		putStat();
	})
}

function vitButton(){
	$('.adventureButtons').on('click','.vitButton', function(){
		console.log('Vitality Adventure!');
		Cvit++;
		putStat();
	})
}

function intButton(){
	$('.adventureButtons').on('click','.intButton', function(){
		console.log('Int Adventure!');
		Cint++;
		putStat();
	})
}

function wsdButton(){
	$('.adventureButtons').on('click','.wsdButton', function(){
		console.log('Wisdom Adventure!');
		Cwsd++;
		putStat();
	})
}

function chrButton(){
	$('.adventureButtons').on('click','.chrButton', function(){
		console.log('Charisma Adventure!');
		Cchr++;
		putStat();
	})
}

function putStat(){
	settings={
		method:'PUT',
		dataType:'json',
		url:statsURLDel,
		data:{
			"id":id,
			"avatar":Cavatar,
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
	console.log('putStat ran');
}

function functionRunner(){
	delAccButton();
	strButton();
	agiButton();
	vitButton();
	intButton();
	wsdButton();
	chrButton();
}

$(functionRunner);