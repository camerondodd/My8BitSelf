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
	statsURLDel=`/profile/stats/${id}`;
	Cstr = data.user.strPts;
	Cagi = data.user.agiPts;
	Cvit = data.user.vitPts;
	Cint = data.user.intPts;
	Cwsd = data.user.wsdPts;
	Cchr = data.user.chrPts;
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
		putStr();
	})
}

function putStr(){
	var newStr=Cstr+1;
	settings={
		method:'PUT',
		dataType:'json',
		url:statsURLDel,
		data:{
			"id":id,
			"strPts":newStr,
			"agiPts":Cagi,
			"vitPts":Cvit,
			"intPts":Cint,
			"wsdPts":Cwsd,
			"chrPts":Cchr
		}
	}
	console.log(settings);
	$.ajax(settings);
	console.log('putStr ran');
}

function functionRunner(){
	delAccButton();
	strButton();


}

$(functionRunner);