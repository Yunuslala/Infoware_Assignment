# Infoware_Assignment

This is a simple employee management system 

## Packages Used
```
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-validator": "^7.0.1",
    "mysql2": "^3.4.2",
    "nodemon": "^2.0.22",
    "redis": "^4.6.7",
    "sequelize": "^6.32.1"

```

## Features 
-  APIValidation
- Pagination
- Relationship 


## Run Locally
### Clone this Project

```
git@github.com:Yunuslala/Infoware_Assignment.git
```

### Install npm Packages

```javascript
npm i --global
```

### Run Server
```javascript
npm run server
```

### Runs the project in the development mode
```
[http://localhost:5700]
```

### Environment Variables Required

`PORT`

   
## API Endpoints
## 1. Employees
- Registration
    - URL: `http://localhost:5700/employee/post`
    - Method: POST
    - Parameters:
    ```
    {
        firstName: string (required),
        lastName: string (required),
        salary: Number(required),
        JobTitle:string(required),
        contacts:[{
            phoneNumber:Number(required),
            email:string(required),
            address:string(required)
        }]
    }
    ```
    - Responses
        - 201 (Ok): `{ msg: "employee has been registered", data}`
        - 400 (missing credentails): `{errors: errors.array() }`
        - 500 (Error): `{ msg: error }`


- All Employee get

    - URL: `http://localhost:5700/employee`
    - Method: GET
    - Parameters:
    ```
    {
       page:optional(as a query),
       pageSize:optional(as a query)
    }
    ```
    - Responses
        - 200 (Ok): `{ emplyees }`
        - 500 (Error): `{ msg: error }`



- Particular Employee get

    - URL: `http://localhost:5700/employee/:id`
    - Method: GET
    - Parameters: contact Id as params(required)
    - Responses
        - 200 (Ok): `{ emplyees }`
        - 404 (Not Found) : `{"msg":`id ${id} is not valid`}`
        - 500 (Error): `{ msg: error }`



- All Contacts

    - URL: `http://localhost:5700/contacts`
    - Method: GET
    - Parameters:
    ```
    {
       page:optional(as a query),
       pageSize:optional(as a query)
    }
    ```
    - Responses
        - 200 (Ok): `{ emplyees }`
        - 404 (Not Found) : `{"msg":`id ${id} is not valid`}`
        - 500 (Error): `{ msg: error }`



- Particular Contacts get

    - URL: `http://localhost:5700/contacts/:id`
    - Method: GET
    - Parameters: contact Id as params(required)
    - Responses:
        - 404 (Not Found): `{ msg: "id is Invalid" }`
        - 500 (Error): `{ msg: error }`
        - 400 (id validation): { errors: errors.array() }`


- Particular Contacts delete
    - URL: `http://localhost:5700/contacts/:id`
    - Method: Delete
    - Parameters: contact Id as params(required)
    - Responses:
        - 404 (Not Found): `{ msg: "id is Invalid" }`
        - 204 (Ok): `{"msg":`id ${id} employee has been deleted`}`
        - 500 (Error): `{ msg: error }`
        - 400 (id validation): { errors: errors.array() }`


- Particular Employee delete

    - URL: `http://localhost:5700/employee/:id`
    - Method: Delete
    - Parameters: contact Id as params(required)
    - Responses:
        - 404 (Not Found): `{ msg: "id is Invalid" }`
        - 204 (Ok): `{ msg: "employee has been deleted", deletedData }`
        - 500 (Error): `{ msg: error }`
        - 400 (id validation): { errors: errors.array() }`


- Particular Employee Update
- URL: `http://localhost:5700/employee/:id`
    - Method: Delete
    - Parameters: 
    ```
    {
         firstName: string (optional),
        lastName: string (optional),
        salary: Number(optional),
        JobTitle:string(optional),
    }
    ```
    - Responses:
        - 404 (Not Found): `{ error: 'Employee not found' }`
        - 204 (Ok): `{ msg: "employee has been deleted", deletedData }`
        - 500 (Error): `{ msg: error }`
        - 400 (id validation): { errors: errors.array() }`


- Particular contact Update
- URL: `http://localhost:5700/contact/:id`
    - Method: Delete
    - Parameters: 
    ```
    {
        phoneNumber:Number(optional),
            email:string(optional),
            address:string(optional)
    }
    ```
    - Responses:
        - 404 (Not Found): `{ error: 'contacts not found' }`
        - 204 (Ok): `{"msg":`id ${id} contact has been updated`,contacts}`
        - 500 (Error): `{ msg: error }`
        - 400 (id validation): { errors: errors.array() }`


# Demonstration Video 
              `(https://drive.google.com/file/d/1i5JYz1eCbNgrP_eyg74a4NcT8bKAiiIM/view?usp=sharing)`




