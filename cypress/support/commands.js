import { getRandomString } from '../util/randomUtil'

Cypress.Commands.add('login', (username, password) => { 
    cy.request({
      method: 'POST',
      url: 'http://localhost:4000/users/authenticate',
      body: {
          username: username,
          password: password
      }
    }).then((resp) => {
      expect(resp.status).to.eq(200)
      window.localStorage.setItem('user', JSON.stringify(resp.body))
    })
})

Cypress.Commands.add('register', (username, password, firstName, lastName) => { 
    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/users/register',
        body: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        }
    }).then((resp) => {
        expect(resp.status).to.eq(201)
        return resp.body.id
    })
})

Cypress.Commands.add('deleteUser', (id) => { 
    cy.request({
        method: 'DELETE',
        url: `http://localhost:4000/users/${id}`,
    }).then((resp) => {
        expect(resp.status).to.eq(204)
    })
})

Cypress.Commands.add('mockSuccessfulRegistration', () => { 
    cy.intercept('POST', '**/users/register', {
        statusCode: 201,
        body: {
            firstName: getRandomString(),
            id: 1,
            lastName: getRandomString(),
            password: getRandomString(),
            username: getRandomString()
        }, 
    }).as('register')
})

Cypress.Commands.add('mockSuccessfulLogin', (firstName) => { 
    cy.intercept('POST', '**/users/authenticate', {
        statusCode: 200,
        body: {
            firstName: firstName,
            id: 1,
            lastName: getRandomString(),
            token: getRandomString(),
            username: getRandomString()
        },
    }).as('loginRequest')
})

Cypress.Commands.add('setTokenInLocalStorage', () => { 
    const user = { token: '12345' }
    window.localStorage.setItem('user', JSON.stringify({ user }))
})
