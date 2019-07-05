import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';


const authors = [
	{
		name: 'Mark Twain',
		imageUrl: '/images/authors/MarkTwain.jpg',
		imageSource: 'WikiMedia Commons',
		books: [
			'The Adventures of Huckleberry Finn',
			'Life on the Mississippi',
			'Roughing It'
		]
	},
	{
		name: 'William Shakespeare',
		imageUrl: '/images/authors/WilliamShakespeare.jpg',
		imageSource: 'WikiMedia Commons',
		books: [
			'Hamlet',
			'Macbeth',
			'Romeo and Juliet'
		]
	},
	{
		name: 'Charles Dickens',
		imageUrl: '/images/authors/CharlesDickens.jpg',
		imageSource: 'WikiMedia Commons',
		books: [
			'David Cooperfield',
			'A Tale of Two Cities',
			'Great Expectations'
		]
	},
	{
		name: 'Steven King',
		imageUrl: '/images/authors/StephenKing.jpg',
		imageSource: 'WikiMedia Commons',
		imageAttributions: 'Pinguino',
		books: [
			'IT',
			'The Shining',
			'The Green Mile'
		]
	},
	{
		name: 'J.K. Rowling',
		imageUrl: '/images/authors/JKRowling.jpg',
		imageSource: 'WikiMedia Commons',
		books: [
			'Harry Potter and the Prisoner of Azkaban',
			'Fantastic Beasts and Where to Find Them',
			'The Cuckoo\'s Calling'
		]
	},
	{
		name: 'Gillian Flynn',
		imageUrl: '/images/authors/GillianFlynn.jpg',
		imageSource: 'WikiMedia Commons',
		books: [
			'Gone Girl',
			'Sharp Objects',
			'Dark Places'
		]
	}
];

function getTurnData(authors) {
	const allBooks = authors.reduce(function (p, c, i) {
		return p.concat(c.books);
	}, []);
	const fourRandomBooks = shuffle(allBooks).slice(0, 4);
	const answer = sample(fourRandomBooks);

	return {
		books: fourRandomBooks,
		author: authors.find((author) =>
			author.books.some((title) => title === answer)
		)
	};
}

function reducer(state = { authors, turnData: getTurnData(authors), highlight: '' }, action) {
	switch (action.type) {
		case 'ANSWER_SELECTED':
			const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
			return Object.assign(
				{},
				state, {
					highlight: isCorrect ? 'correct' : 'wrong'
				}
			);
		case 'CONTINUE':
			return Object.assign(
				{},
				state,
				{ highlight: '', turnData: getTurnData(state.authors) }
			);
		case 'ADD_AUTHOR':
			return Object.assign({}, state, {
				authors: state.authors.concat([action.author])
			});
		default: return state;
	}
}

let store = Redux.createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<BrowserRouter>
		<ReactRedux.Provider store={store} >
			<React.Fragment>
				<Route exact path="/" component={AuthorQuiz} />
				<Route exact path="/add" component={AddAuthorForm} />
			</React.Fragment>
		</ReactRedux.Provider>
	</BrowserRouter >,
	document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
