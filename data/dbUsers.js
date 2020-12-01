db = db.getSiblingDB('bookAPI');

db.createUser({
  user: 'BobRoss',
  pwd: 'password',
  roles: [
    { role: 'readWrite', db: 'bookAPI' }
  ]
});
