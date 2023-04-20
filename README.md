# Erasmus+ SDS project

The project is an application referencing all the courses Erasmus+ students can attend at Poznań University of Technology, with comments left by previous Erasmus+ students, and the possibility to sketch a learning agreement.

## Roles and responsibilities

- Hector Marchand (Scrum Master/Developer):
    - Responsible for the meeting schedules
    - Responsible for the progress of the project
    - Responsible for the frontend

- Valeria Azurduy Guzman (Product Owner):
    - Responsible for the choice of the users story to implement
    - Responsible for the validation criteria of the user stories implementations

- Yanis Bouger (Developer):
    - Responsible for the backend

- Tom Picaud (Developer):
    - Responsible for the CI

- Sergio Gomez Martin (Developer)
    - Responsible for the frontend

## Communication strategies

We communicate with messages using WhatsApp, and we use Discord to make stand-up meetings.

## Installation manual

The project is run using docker, the following commands can be used:

- `docker-compose -f docker-compose.dev.yml up` to run in development mode.

- `docker-compose up` to run in production mode.

Once the application is running, you can access it in a web browser via:  

- In development mode, http://localhost:4200 for the frontend and http://localhost:3000/api for the swagger api for the backend.

- In production mode, http://localhost
