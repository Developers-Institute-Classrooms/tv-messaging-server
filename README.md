# Node Babel Template

A node.js and babel template repo.

## MongoDB

Get a MongoDB instance running in a container with dummy data.

```shell
docker run -d -p 27017:27017 --name node-babel-mongo \
  -v $(pwd)/data:/docker-entrypoint-initdb.d \
  mongo
```

## Getting Started

```
# start nodemon server
npm run dev
```
