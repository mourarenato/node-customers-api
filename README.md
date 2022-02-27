# Installation

Get started with Makefile:

1. Run `make fileMode`
2. Run `make files`
3. Run `make install`
4. Run `make up`
5. Run `make start`

Get started without Makefile:

1. Copy `.env.example` to `.env` 
2. Copy `docker-compose.yml.example` to `docker-compose.yml`
3. Edit the `docker-compose.yml` with your Docker information
4. Checks database settings in `.env` file
5. Run `docker-compose up -d` command
6. Run `sudo chmod 777 -R dist/;sudo chmod 777 -R node_modules/` command
7. Run `sudo mkdir logs;sudo chmod 777 -R logs/` command
8. Run `docker exec -it node-customers-api bash -c "npm start"` to start server

# Project information

This project is a simple Rest API for register of customers. Here is used Typescript, a statically compiled language to write clear and simple Javascript code.

- When starting the server, the tables are created automatically 

# Using the project

- `First you must create an admin user`: 

Endpoint(POST): http://10.10.0.22:4000/api/admin/signup

    {
        "email": "myemail@email.com",
        "password": "mypassword",
    }

- `After you must authenticate to get your bearer token`:

Endpoint(POST): http://10.10.0.22:4000/api/admin/signin

    {
        "email": "myemail@email.com",
        "password": "mypassword",
    }

Example of response: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6W3siaWQiOjEsImVtYWlsIjoibXllbWFpbEBlbWFpbC5jb20iLCJwYXNzd29yZCI6IjQ3MGUzNzVhMmMyZjIxZWMyYTVhZDhjNTRiMTliYjc4YzA5YWRmNWFlZGEwODc4ZWY5N2VjNWRjMDRjNWU5MDQifV0sImlhdCI6MTY0NTg0MzAwOSwiZXhwIjoxNjQ1OTI5NDA5fQ.cESM6lySYrtmMXXTvjXuNd1lrKfM0eqzXND6eHPfkJg"

- `Now you are logged and can access others endpoints`:

`To create a customer`, send request (POST) to URL http://10.10.0.22:4000/api/customer in Postman (or another) with your bearer token

Example of request:

    {
        "name": "Pharmacy",
        "email": "pharmacy@email.com"
    }

`To get a customer`, send request (GET) to URL http://10.10.0.22:4000/api/customer/<ID> in Postman (or another) with your bearer token

`To get all customers`, send request (GET) to URL http://10.10.0.22:4000/api/customer in Postman (or another) with your bearer token

`To get delete a customer`, send request (DELETE) to URL http://10.10.0.22:4000/api/customer/<ID> in Postman (or another) with your bearer token

`To alter a customer`, send request (PUT) to URL http://10.10.0.22:4000/api/customer/<ID> in Postman (or another) with your bearer token

Example of request:

    {
        "name": "Pharmacy",
        "email": "otherpharmacy@email.com"
    }

`To create a product`, send request (POST) to URL http://10.10.0.22:4000/api/product in Postman (or another) with your bearer token

Example of request:

    {
        "name": "Orange",
        "email": "orange@email.com"
    }

`To get a product`, send request (GET) to URL http://10.10.0.22:4000/api/product/<ID> in Postman (or another) with your bearer token

`To get products paginated by page`, send request (GET) to URL http://10.10.0.22:4000/api/product/?page=<PAGE> in Postman (or another) with your bearer token