/**
 * Notice how this syntax is very similar to mongo shell commands
 * except the syntax is also valid JavaScript.
 * 
 * You can copy and paste this code into Robo 3T and it should execute
 * like it would if you tried to run the same commands in the shell.
 */
db = db.getSiblingDB('bookAPI');

db.people.insert([
	{
		email: 'lance@developers.ac.nz',
		password: 'fyFQNLL42s3Mb2vp9iisXuPz',
		name: 'Lance',
		readingList: []
	},
	{
		email: 'nick@developers.ac.nz',
		password: 'JVV9yDcDUja4sqZWGZDMBkFz',
		name: 'Nick',
		readingList: []
	},
	{
		email: 'mark@developers.ac.nz',
		password: 'aNdWYwrarHYnr3mTTMesBx3w',
		name: 'Mark',
		readingList: []
	},
	{
		email: 'nik@developers.ac.nz',
		password: 'fRDzZ7DCaZJ5Lzq2y9KXptWm',
		name: 'Nik',
		readingList: []
	}
]);
