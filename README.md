# Overview

Report Management System

- For given task I built this application, implemented user actions services, admin actions services and also genarated refresh token.

## Technology used

- Nodejs (version - v16.20.1)
- MongoDB (version - 6.0.9)

## Inatallation and Run

1.  Install npm packages:

```bash
npm i
```

2. Setup environment variables:

Copy `.env.example` to `.env` and you can also replace `.env` configurations with yours.

3. Start app

```bash
npm run start
```

Now API will available at 6006 port, or other you configured

4. Seed data.

- for creating admin run this script (you can also add your own credential)

```
node ./seed/createAdmin.js
```

after creating admin, must clean the credential from the script 😊.

- for seeding sample report data run this script

```
node seed/data/import-data.js  --import
```

## API's

- ✴️ Please import Postman collection and Postman environment for test api through Postman. <br>
Folder location (seed/postman_data)

* Auth

  - Sign up
    - POST `/api/v1/users`
    - request body:

    ```js
    {
      "name": "sajjad",
      "phone": "01650103297",
      "address": "mahammadpur",
      "profession": "full stack developer",
      "favoriteColors": ["black", "blue"],
      "email": "sajjad@gmail.com",
      "password": "sajjad5522",
      "passwordConfirm": "sajjad5522"
    }
    ```

  Note: you can also use your credential, by default all register role will be `user`

  - Sign in

    - POST `/api/v1/users`
    - request body:
    ```js
    {
      "email": "sajjad@gmail.com",
      "password": "sajjad5522",
    }
    ```

    Note: You can also use your credentials.

    - Setup Environment Token: <br>(1) After login , you will get token into response(json), and you can also set it into environment variable (token). <br>(2) For login as a admin, please use admin login credential, and you can also set the token into enviroment variable (admintoken)

  - Genarate Refresh Token
    - GET `/api/v1/users/refresh-token`
    - pass `token` as authorization header.

    Note: You can genarate new token with both (expired and non-expired) token.



* Reports
  - List of Reports:
    - GET `/api/v1/reports`
    - pass `token` as authorization header.
  - Add new Report:
    - POST `/api/v1/reports`
    - pass `admintoken` as authorization header.
  - Update Report:
    - PATCH `/api/v1/reports/:id`
    - pass `admintoken` as authorization header.
  - Delete Report:
    - Delete `/api/v1/reports/:id`
    - pass `admintoken` as authorization header.
  









