/**
 * Notice how this syntax is very similar to mongo shell commands
 * except the syntax is also valid JavaScript.
 * 
 * You can copy and paste this code into Robo 3T and it should execute
 * like it would if you tried to run the same commands in the shell.
 */
db = db.getSiblingDB('bookAPI')

db.books.insert([
	{
		title: 'War and Peace',
		genre: 'Historical Fiction',
		author: 'Lev Nikolayevich Tolstoy'
	},
	{
		title: 'Les Misérables',
		genre: 'Historical Fiction',
		author: 'Victor Hugo'
	},
	{
		title: 'The Time Machine',
		genre: 'Science Fiction',
		author: 'H. G. Wells'
	},
	{
		title: 'A Journey into the Center of the Earth',
		genre: 'Science Fiction',
		author: 'Jules Verne'
	},
	{
		title: 'The Dark World',
		genre: 'Fantasy',
		author: 'Henry Kuttner'
	},
	{
		title: 'The Wind in the Willows',
		genre: 'Fantasy',
		author: 'Kenneth Grahame'
	},
	{
		title: 'Life On The Mississippi',
		genre: 'History',
		author: 'Mark Twain'
	},
	{
		title: 'Childhood',
		genre: 'Biography',
		author: 'Lev Nikolayevich Tolstoy'
	}
])
