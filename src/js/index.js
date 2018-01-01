import Rx from 'rx';
import {getRepos} from './helper';
import {
  reposTemplate,
  userTemplate
} from './templates';
$(() => {
	const $container = $('.content_container');
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
	      .flatMapLatest(getRepos)
	      .do((results) => $container.html(''))
	      .flatMap((results) => Rx.Observable.from(results))
	      .map((repos) => $(reposTemplate(repos)))
	      .do(($repos) => {
	      	$container.append($repos);
	      });

	observable.subscribe((data)=>{
        console.log('success');
	},(err) => {
		console.log(err);
	},() => {
		console.log('completed');
	});

});

