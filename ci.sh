#!/bin/bash
npm install
npm start & ./node_modules/.bin/wait-on http://localhost:8080 && npx cypress run --browser chrome --spec 'cypress/integration/stubs/**/*'