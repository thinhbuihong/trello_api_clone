# Trello API Clone

### Features
- User: signup, signin, signout
- Board: fetch, create, modify, delete
- List: fetch, create, modify, delete
- Card: fetch, create, modify, delete

### Technologies used
- Express
- MongoDB
- Mongoose, Typegoose
- Argon2
- Express-session
- Jest, Supertest

### ER Diagram
![ERD_trello](https://user-images.githubusercontent.com/45941660/154795985-c72e9f07-2a0b-4782-a257-13bff5a05acd.png)

### API Documentation
- User:  
  | METHOD  |    ENDPOINT            |    FEATURE                            |
  | --------|------------------------|---------------------------------------|
  |  POST   | /api/users             | Create new user                       |
  |  GET    | /api/users             | Get current user                      |
  |  POST   | /api/users/signin      | Sign in                               |
  |  GET    | /api/users/signout     | Sign out                              |
  
- Board:
  | METHOD  |    ENDPOINT            |    FEATURE                            |
  | --------|------------------------|---------------------------------------|
  |  POST   | /api/boards            | Create new board                      |
  |  GET    | /api/boards            | Get boards                            |
  |  GET    | /api/boards/:id        | Get board by id                       |
  |  PATCH  | /api/boards/:id        | Update board                          |
  |  DELETE | /api/boards/:id        | Delete board                          |
  |  GET    | /api/boards/:id/lists  | Get lists by boardId                  |
  |  GET    | /api/boards/:id/cards  | Get cards by boardId                  |
  
- List:
  | METHOD  |    ENDPOINT            |    FEATURE                            |
  | --------|------------------------|---------------------------------------|
  |  POST   | /api/lists             | Create new list                       |
  |  GET    | /api/lists/:id         | Get list by id                        |
  |  PATCH  | /api/lists/:id         | Update list                           |
  |  DELETE | /api/lists/:id         | Delete list                           |
  |  GET    | /api/lists/:id/cards   | Get cards by listId                   |
  
- Card:
  | METHOD  |    ENDPOINT            |    FEATURE                            |
  | --------|------------------------|---------------------------------------|
  |  POST   | /api/cards             | Create new card                       |
  |  GET    | /api/cards/:id         | Get card by id                        |
  |  PATCH  | /api/cards/:id         | Update card                           |
  |  DELETE | /api/cards/:id         | Delete card                           |
  
