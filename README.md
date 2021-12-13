# FullStackOverflow-API

Full Stack Overflow is my first typescript project.

It consists of a simple RESTful API through which students can send, answer and get questions. 

The API was made using NodeJs/Express. 

## Features

- Post questions
- Post answers
- Post students
- Get a list of unanswered questions
- Get a specific question

## Technologies

- express
- postgresql 
- joi


## Requirements

- npm
- git
- postgres

## How to use

The easiest way to use the API is to send request to the following URL: https://fullstackoverflow-api.herokuapp.com

### Running locally

1- Clone this repository using ```git clone https://github.com/giancarvalho/FullStackOverflow-API.git```

2 - Run ```npm install``` 

3 - Use the dump.sql file to create your postgres database.

4 - Add your .env files to the root folder (follow the [env.example](https://github.com/giancarvalho/FullStackOverflow-API/blob/d480e7899a1ef3f200ff428fabcc8554e3fccc42/.env.example) file)

5 - Run ```npm run dev```


## Endpoints guide

GET /questions - returns a list of unswared questions.

POST /questions - needs an object with the following properties:

```
{
	"question": "How to use interfaces in typescript?",
	"student": "John Doe",
	"class": "T3",
	"tags": "Typescript"
}

```
GET /questions/:id - replace ":id" with the id number of the question you want to get. This enpoint returns an object with the following properties:

```
- Unanswered Question

{
	"question": "How to use interfaces in typescript?",
	"student": "John Doe",
	"class": "T3",
	"tags": "typescript"
	"answered": false,
	"submitAt": "2021-01-01 10:12"
}

- Answered Question

{
	"question": "How to use interfaces in typescript?",
	"student": "John Doe",
	"class": "T3",
	"tags": "typescript",
	"answered": true,
	"submitAt": "2021-01-01 10:12",
   "answeredAt": "2021-01-01 10:30",
	"answeredBy": "Jane Doe",
	"answer": "Lorem ipsum..." 
}

```

POST /questions/:id - replace ":id" with the id number of the question you want to answer. You need to send a token, which you get when creating a student, and the following object:

```

{
	"answer": "Lorem ipsum..." 
}

```

POST /users - lets you create user. You need to send an object with the properties list below. If the class does not exist, it will be created in the same request.

```
{
	"name": "John Doe",
	"class": "T3" 
}

```
