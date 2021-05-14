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

#### What Assumptions were made prior to starting the project?

1. **Emphasis on Accessibility**
   Given that the current NexTrip app solves a public need, I assumed the application I built would need to keep accessibility in mind. I reached for the @angular/material library knowing that its components, namely the select list component, already follow most WCAG 2.1 guidelines.

2. **Performance Matters**
   Performance is a pretty core concern for any SPA, but especially so with an application that is likely to be used over cellular data more often than wi-fi. I wanted to keep the application as performant and light as possible. I was hesitant to utilize an entire component library for only a handful of features and concerned about pulling in more utilities, libraries, or npm packages. For styling purposes, I made use of Tailwind--a utility I haven’t used before--in the hopes of shipping only those styles actually present in the application HTML.

   With regards to the code itself, I made attempts at improving upon the performance of my initial, naive approach. I implemented memoization to each of the HTTP services, and a 35s debounce to ensure that the trainst results could be refreshed while still following the NexTrip API guidelines. With regards to the code itself, I made attempts at improving upon the performance of my initial, naive approach. I implemented memoization to each of the HTTP services, and a 35s debounce to ensure that the trainst results could be refreshed while still following the NexTrip API guidelines.

3. **Attention to Detail**
   Despite treating this case study as a proof-of-concept, I figured this app I built still needed to look decent. It was a point of pride if nothing else. Again, I pulled in Tailwind to add some styles and flare, and utilized layout components like the MatTable provided by the material library. These things combined allowed me to focus on other attributes of the application, like the core logic and separation of concerns.

4. **Potential to Scale**

The nature of a transit app--transportation being something that changes regularly within a city--made me believe the code needed to be fluid and easy to update. The app wouldn’t just need to scale but would need to shift and mutate to meet new API structures. As a result, I made an effort to develop the app with a domain-driven design approach. I wanted to ensure that should something change--a requirement or the shape of the data itself--the application could change with it. The `TransitRoute` model, for instance, is broken out into multiple classes and structures; through the use of TypeScript mixins, I am then able to compose a model that makes sense for the current “Filter by Route” context. These same mixins could be carried over to the “Filter by Stop” context with minimal effort.
