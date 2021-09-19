# FMRadio

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.2.

## How I worked on this project

My goal was to design and implment a web-based FM radio frontend:

- To be operated by a untrained user.

- Runs on desktop and mobile devices.

* I built this application usign Angular and CSS.

- I worked on this application locally since it was a small solo project.

## How to navigate this project

- Application is split into three components: [App](https://gitlab.com/mrcordova/FM-Radio-Frontend/-/tree/main/src/app), [Display Panel](https://gitlab.com/mrcordova/FM-Radio-Frontend/-/tree/main/src/app/display-panel), [Control Panel](https://gitlab.com/mrcordova/FM-Radio-Frontend/-/tree/main/src/app/control-panel).
  - App holds the Display Panel and Control Panel.
  * Display Panel contains the current FM frequency.
  * Control Panel holds channel frequncy slider, volume rotary knob, six save/restore channels frequencies buttons.

## Why I built the project this way

- I used Angular because
  - it was easy to set up and get working as fast as possible.
  - Angular has many directive and tools that could aid me in this project.
  - Component-based architecture allowed me to break up project into smaller pieces.
  - Packaged with typescript to enforce proper typing and prevent errors.

## If I had more time I would change this

- Set up continuous integration to run tests.
- Refactor code to remove redundancies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

If you encounter the following error: `An unhandled exception occurred: Cannot find module '@angular-devkit/build-angular/package.json'`, run `npm i` to install all the necessary dependencies then run `run serve`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
