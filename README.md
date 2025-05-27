# MyDayApp - Angular

MyDayApp is an application to manage tasks in a simple and easy way, where you can also test your knowledge of Angular.

![preview](https://i.imgur.com/et5mmr7.png)

- [Installation](#installation)
- [Configuration](#configuration)
- [Features](#features)
- [Tests](#tests)
- [How to submit your solution](#how-to-submit-your-solution)
- [License](#license)
- [Credits](#credits)

## Installation

1. Fork this project to your personal space
2. Clone the repository from your personal space to your computer
3. Install dependencies using the command `npm install`
4. Verify the development environment with the command `ng serve`

---

### End-to-end (e2e) Test Environment Installation

1. Install e2e test requirements with the command `npm run e2e:install`
2. Verify that e2e tests run with the command `npm run e2e`

## Configuration

The project comes with an initial configuration, which is typical for Angular projects and is ready to start adding features.

<project structure>

### HTML and CSS

You must keep the HTML class names as they are, since they refer to `src/styles.css`. Do NOT edit the `styles.css` file.

> If you change the class names or the HTML structure, the [e2e tests](#tests) may fail, since they specifically reference those elements and classes.

Initially, there is a component with the initial layout in `src/app/pages/home/home.component.html`, which includes an example of how to display tasks with different styles based on their state:

<task example HTML>

This will render like this:

![tasks](https://i.imgur.com/GiBhkwl.png)

> You could implement all the logic in a single component (`src/app/pages/home/home.component.ts`), but it's expected that you divide responsibilities into multiple components.

### Scripts

- `npm run build`: Runs Webpack in production mode and outputs the production files to `/dist/app`.
- `npm run e2e`: Runs the [e2e tests](#tests) using [Playwright](https://playwright.dev/).
- `npm run start`: Starts a development server with live reload.
- `npm run start:prod`: Starts a production server using `http-server` serving the `/dist/myapp` folder. Make sure to run `npm run build` before this command.

## Features

The recommended data model for a task is:

- id: string
- title: string
- completed: boolean

To create a consistent and useful task app, your app should meet the following 9 feature requirements.

### 1. Hide the main and footer sections

- When there are no tasks, the elements with IDs `#main` and `#footer` should be hidden.

### 2. Create a new task

- Use the main input to create a new task.
- This input should be focused on page load (preferably using the `autofocus` attribute).
- Pressing Enter creates a task with a **pending** state, adds it to the list, and clears the input.
- Use `.trim()` to remove leading/trailing spaces and ensure the task is not an empty string.

### 3. A task

Each task should support three interactions:

1. Clicking the checkbox marks it as **completed**, and clicking again toggles it back to **pending**.
2. Double-clicking the `<label>` activates edit mode.
3. Hovering over the task should show the delete button (`.destroy`).

### 4. Editing a task

- In edit mode, other elements should be hidden, and an input with the task title should appear and be focused (`.focus()`).
- Pressing Enter saves the change and exits edit mode.
- Use `.trim()` to remove unnecessary spaces.
- Pressing Escape exits edit mode and discards changes.

### 5. Counter

- The footer should show the number of **pending** tasks.
- The number should be wrapped in a `<strong>` tag.
- Correctly pluralize "item" based on the count: `0 items`, `1 item`, `2 items`.

### 6. Clear completed button

- There should be a button to delete all tasks marked as **completed**.

### 7. Persistence

- Reloading the app should restore tasks from LocalStorage.
- Use the key `mydayapp-angular` in LocalStorage (this is required for [e2e tests](#tests)).
- Interface state (e.g., edit mode) does **not** need to be saved—only the tasks.

### 8. Filters and routes

There should be three filters accessible via URL and as links in the footer:

- `/all`: Shows all tasks (both **completed** and **pending**).
- `/pending`: Shows only **pending** tasks.
- `/completed`: Shows only **completed** tasks.

### 9. Deployment

Deploy the app using one of the following services: GitHub Pages, Netlify, Vercel, Firebase Hosting.

## Tests

End-to-end tests run with Playwright using the command `npm run e2e`. It's included in the project dependencies, but make sure to first run `npm run e2e:install` to install the necessary Playwright requirements.

When you run `npm run e2e` for the first time—before implementing all the [features](#features)—tests will fail and look like this:

![failed](https://i.imgur.com/C0jGlXl.png)

After implementing all features, tests should pass and look like this:

![success](https://i.imgur.com/3wL4dO2.png)

> You can run `npm run e2e` as you build each feature to ensure you're on the right track.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Credits

- [TodoMVC Project](https://todomvc.com/)
- [MyDayApp - JavaScript](https://github.com/platzi/laboratorio-mydayapp-js)
