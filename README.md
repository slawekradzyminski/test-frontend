# canTest.it frontend application

`npm install`

`npm start`

Application should run on [http://localhost:8080](http://localhost:8080)

# Allure

```commandline
npm install -g allure-commandline
allure serve
```

# Overrido config

```commandline
npx cypress run --config-file conf.json --browser chrome --headed --spec 'cypress/integration/login.spec.js'
```