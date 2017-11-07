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
	console.log(statsURLDel);
}

getStats(displayStats);

const logInURL = '/auth/login';

function delReD(){
	settings={
		method:'GET',
		dataType:'json',
		url:logInURL,
	};
	$.ajax(settings);
}

function delAccButton(){
	console.log('tester');
 	$('.delAcc').on('click','.delAccButton', function(){
 	console.log('delAcc button pressed');
 	delAcc();
 	delReD();
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



function functionRunner(){
	delAccButton();


}

$(functionRunner);