To start application you need:
1. Run `npm install` in the root directory
2. Run `npm install` in the `client` directory for downloading Front-End 
3. Create `.env` file in the root of the project with the following fields:
```
DB_URI = mongodb+srv://*PUT LOGIN HERE*:*PUT PASS HERE*@cluster0.iwstizm.mongodb.net/?retryWrites=true&w=majority
PORT = 8080
JWT_ACCESS_SECRET = 
JWT_REFRESH_SECRET = 
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
``` 
4. Create a `.env` file in the `client` directory with the following fields:
```
REACT_APP_GOOGLE_CLIENT_ID=
REACT_APP_GOOGLE_CLIENT_SECRET=
```
