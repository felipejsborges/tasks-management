## [X] As a user, I want to be able to register in the system to create an account.

**Functional Requirements:**

- [X] The system should allow the user to register by filling out a registration form with name, email, and password;
- [X] The system should check if the email provided already exists in the database and notify the user if it does.

**Non-functional Requirements:**

- [X] The user's password must be encrypted before being stored in the database;

## [X] As a user, I want to be able to log in to the system to access my account.

**Functional Requirements:**

- [X] The system should allow the user to log in by providing the registered email and password;
- [X] The system should verify if the login information is valid and allow access to the user's account.

**Non-functional Requirements:**

- [ ] The system should store the authentication token in a secure cookie;
- [ ] The expiration time of the token should be configurable.

## [ ] As a user, I want to be able to view my profile to see my user information.

**Functional Requirements:**

- [X] The system should allow the user to view their profile information, such as name and email;
- [X] The system should allow the user to edit their profile information.

**Non-functional Requirements:**

- [X] The system should display the profile information clearly and in an easy-to-understand way.

## [ ] As a user, I want to be able to create, view, update, and delete my tasks.

**Functional Requirements:**

- [ ] The system should allow the user to create a new task by providing the title and description;
- [ ] The system should allow the user to view their created tasks;
- [ ] The system should allow the user to update the information of an already created task;
- [ ] The system should allow the user to delete an already created task.

**Non-functional Requirements:**

- [ ] The tasks should be displayed in a paginated list;
- [ ] The tasks should be securely stored in the database.

## [ ] As a user, I want to be able to filter and paginate the task list to facilitate navigation.

**Functional Requirements:**

- [ ] The system should allow the user to filter the task list by title or description;
- [ ] The system should allow the user to view a page of tasks with up to 20 items per page;
- [ ] The system should allow the user to navigate to other pages of the task list.

**Non-functional Requirements:**

- [ ] The system should load the task list quickly and efficiently;
- [ ] The system should display the task list clearly and in an easy-to-understand way.