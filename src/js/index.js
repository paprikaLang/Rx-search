import Rx from 'rx';
import {getRepos} from './helper';
$(() => {
	const $input = $('.search');
	// const observable = Rx.Observable.fromEvent($input,'keyup')
	//                    .map(() => $input.val().trim())
	//                    .filter((text) => !!text)
	//                    .do((value) => console.log(value));
	// observable.subscribe();
	const observable = Rx.Observable.fromEvent($input,'keyup')
	      .map(() => $input.val().trim())
	      .filter((text) => !!text)
	      .do((value) => console.log(value))
	      .flatMap(getRepos);
	observable.subscribe();
});

