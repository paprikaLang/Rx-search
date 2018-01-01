import Rx from 'rx';
$(() => {
	const $input = $('.search');
	const observable = Rx.Observable.fromEvent($input,'keyup')
	                   .map(() => $input.val().trim())
	                   .filter((text) => !!text)
	                   .do((value) => console.log(value));
	observable.subscribe();
});