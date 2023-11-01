# Daily Diet API
The Daily Diet API is an application that allows users to record their daily meals, keeping track of whether the meals are within or outside their diet. Additionally, it provides metrics to help users monitor their progress.

### Application Rules
- [x] It must be possible to create a user.

- [x] It must be possible to identify the user between requests.

- [x] It must be possible to record a meal with the following information:

Meals must be related to a user:
    - Name
    - Description
    - Date and Time
    - Whether it is within the diet or not

- [x] It must be possible to edit a meal, allowing changes to all the above data.

- [x] It must be possible to delete a meal.

- [x] It must be possible to list all the meals of a user.

- [x] It must be possible to view a single meal.

- [x] It must be possible to retrieve user metrics.

    - [x] Total number of recorded meals.
    - [x] Total number of meals within the diet.
    - [x] Total number of meals outside the diet.
    - [x] The user can only view, edit, and delete the meals they created.

## Installation
```bash
Copy code
# Clone the repository
  git clone https://github.com/geversonfernandes/daily-diet-api.git

# Install project dependencies
  npm install

# Run the project's migrations to create the database and its tables
  npm run knex -- migrate:latest

# Running the project
  npm run dev
```

## Technologies Used
The Daily Diet API was developed using the following technologies:

- TypeScript: The programming language used for the application's development.
- ESLint: A static code analysis tool to ensure code consistency.
- Database - Knex: A library for querying and managing databases with support for migrations.
- Environment Variables: Used to store sensitive configurations such as secret keys and database connection information.
- Data Validation - ZOD: A library for validating and ensuring the integrity of input data.
- Fastify: A fast and efficient web framework for building RESTful APIs with support for plugins, cookies, and request preprocessing.