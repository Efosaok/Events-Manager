$(document).ready(() => {
	$('.nav-add-event').click(() => {
		$('.view').html($('.add-event-form'))
	})
	$('.nav-see-events').click(() => {
		alert('hello')
		$('.view').html($('.user-events'))
	})
	$('.nav-see-centers').click(() => {
		alert('hello')
		$('.view').html($('.user-centers'))
	})
})