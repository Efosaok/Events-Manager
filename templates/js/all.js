const changeToSignUp = () => {
    $('.sign-in-container').toggleClass('animate-switch');
    $('.form').html($('.form-holder').html());
}
$(document).ready(() => {
  $('.form-holder').hide();
  const signInForm = $('.form-holder').html();
  const signUpForm = $('.form').html();
  $('.sign-in-container').removeClass('animate-switch');
  $('.switchform').on('click', () => {
  	changeToSignUp();
    $('.switchpage').on('click', () => {
    $('.sign-in-container').removeClass('animate-switch');
  	alert('working')
  	$('.form').html('');
  	$('.sign-in-container').toggleClass('animate-switch');
  	$('.form').html(signUpForm);
  	setTimeout(() => {
  		window.location.reload();
  	}, 2000)
  });
  });  /*$('.movetosignup').eq(0).on('click', () => {
  	alert('hello')
  	if (hasBeenToggled) {
    $('.sign-in-container').removeClass('animate-switch');
    }
    $('.sign-in-container').addClass('animate-switch');
    $('.form').html(signUpForm);
    hasBeenToggled = true;
  });*/
})