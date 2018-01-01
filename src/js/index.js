import Rx from 'rx';
import {getRepos} from './helper';
import {
  reposTemplate,
  userTemplate
} from './templates';
$(() => {
	const $input = $('.search');
	// const observable = Rx.Observable.fromEvent($input,'keyup')
	//                    .map(() => $input.val().trim())
	//                    .filter((text) => !!text)
	//                    .do((value) => console.log(value));
	// observable.subscribe();
	const observable = Rx.Observable.fromEvent($input,'keyup')
	      .debounce(400)
	      .map(() => $input.val().trim())
	      .filter((text) => !!text)
	      .distinctUntilChanged()
	      .do((value) => console.log(value))
	      .flatMapLatest(getRepos);
	observable.subscribe((data)=>{
          showNewResults(data);
	},(err) => {
		console.log(err);
	},() => {
		console.log('completed');
	});
	const showNewResults = (items) => {

	}
});

