const statsURL='../profile/stats';

function statsButton(){
	$('.statsContainerContainer').on('click','.statsButton', function(){
	console.log('stats button pressed');
	getStats(displayStats);
	})
}

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
	$('.statsContainer').html(
		`<p> $(data.user.username) </p>`
	);
}

function functionRunner(){
	statsButton();

}

$(functionRunner);