# NexTrip Case Study

NexTrip is a transit tool provided by the MetroTransit system of Minnesota. The tool provides information about a particular transit route, such as when the next scheduled departure is and what stops are available along the route.

This project aims to replicate that same functionality within a single-page app context using the public API provided by MetroTransit.

You can view the current NexTrip application on [MetroTransits website](https://www.metrotransit.org/nextrip/).

## API Reference

- **NexTrip API Dodcumentation**: https://svc.metrotransit.org/nextrip

- **Swagger API Documentation**: https://svc.metrotransit.org/swagger/index.html

## Tech Stack

- **Angular v11.2:** the framework of choice here to scaffold and build the project quickly

- **Material Components v11.2:** UI components provided by Google that have accessibility and testing baked in

- **Tailwind v2:** A PostCSS style system that allows uglification, minification, and utility-first methodology.

## Run Locally

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.12. Most if not all commands available in the @angular/cli will work within this project.

Once running, the application will be available locally on [http://localhost:4200/](http://localhost:4200/).

### Clone the Project

```bash
 git clone https://github.com/cwgruss/NextTrip-Transit-Study.git
```

### Install Dependencies

```bash
Cd NextTrip-Transit-Study/
npm install
```

### Start the Dev Server

```bash
npm start
```

or run

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running Tests

### Unit Tests

**Unfortunately, despite best intentions, there are currently no tests in this repository as of this moment. That means that the below commands will not run**

To run Unit Tests, run the following command

```bash
  npm run test
```

### e2e Tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

```bash
npm run e2e
```

## FAQ

#### Question 1

Answer 1

#### Question 2

Answer 2
