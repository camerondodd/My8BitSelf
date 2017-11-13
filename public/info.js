function oneQ(){
	$('.questionContainer').on('click','.oneQ',function(){
		$('.twoA').prop('hidden',true);
		$('.threeA').prop('hidden',true);
		$('.contactA').prop('hidden',true);
		$('.oneA').prop('hidden',false);
	});
}

function twoQ(){
	$('.questionContainer').on('click','.twoQ',function(){
		$('.oneA').prop('hidden',true);
		$('.threeA').prop('hidden',true);
		$('.contactA').prop('hidden',true);
		$('.twoA').prop('hidden',false);
	});
}

function threeQ(){
	$('.questionContainer').on('click','.threeQ',function(){
		$('.twoA').prop('hidden',true);
		$('.oneA').prop('hidden',true);
		$('.contactA').prop('hidden',true);
		$('.threeA').prop('hidden',false);
	});
}

function contact(){
	$('.questionContainer').on('click','.contactQ',function(){
		$('.oneA').prop('hidden',true);
		$('.threeA').prop('hidden',true);
		$('.twoA').prop('hidden',true);
		$('.contactA').prop('hidden',false);
	});
}

function functionRunner(){
	oneQ();
	twoQ();
	threeQ();
	contact();
}

$(functionRunner);