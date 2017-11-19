$(document).ready(() => {
	let container = $('body');
    let scrollTo = $('#descriptions');
	let hasBeenSwitched = false
	$('.see-more-one').on('click', () => {
		if (!hasBeenSwitched) {
		  $('.imagec-one').removeClass('fade-c')
		  $('.imagec-one').addClass('fade-c')
          $('.imagec-one').attr('src', './templates/images/coference2.jpg');
          hasBeenSwitched = true;
		} else {
            $('.imagec-one').removeClass('fade-c')
			$('.imagec-one').attr('src', './templates/images/coference1.jpg');
			hasBeenSwitched = false;
		}
	})

	$('.see-more-two').on('click', () => {
		if (!hasBeenSwitched) {
		  $('.imagec-two').removeClass('fade-c')
		  $('.imagec-two').addClass('fade-c')
          $('.imagec-two').attr('src', './templates/images/wedding3.jpg');
          hasBeenSwitched = true;
		} else {
            $('.imagec-two').removeClass('fade-c')
			$('.imagec-two').attr('src', './templates/images/weddin1.jpg');
			hasBeenSwitched = false;
		}
	})
    
    $('.slide-up').click(() => {
    $('html, body').animate({
        scrollTop: $("#descriptions").offset().top
    }, 2000);
    alert('hello');
    })
}) 