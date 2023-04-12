# UpLearn Backend

## Description
This is the backend of UpLearn, an organisational system for educational establishments. It was created by [Tim Hrovat](https://timhrovat.com) as a graduation project at [Vegova, Ljubljana](https://www.vegova.si).

Other repositories can be found [here](https://github.com/UpLearnOrg).

## API documentation
API documentation can be found on the `/api` endpoint.

## Setup

### Clone the application
```bash
git clone git@github.com:UpLearnOrg/uplearn-backend.git
```

### Install dependencies
```bash
npm install
```

### Initialize a docker container
```bash
docker compose up -d
```

### Migrate database
```bash
npx prisma migrate dev --name init
```

### Set up environment variables
Create a .env file and set up appropriate variables
```
DATABASE_URL="postgresql://janedoe:mypassword@localhost:5432/mydb?schema=sample"

JWT_SECRET = my_secret

EMAIL_SERVICE=mail.service.com
EMAIL_USER=uplearn@email.com
EMAIL_PASSWORD=mypassword
EMAIL_PORT=587

FRONTEND_URL=http://localhost:3000
```

### Run the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

