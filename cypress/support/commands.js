// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('checkUserKeyNull', () => {
    const userKey = window.localStorage.getItem('user')
    expect(userKey).null
})

Cypress.Commands.add('setTokenInLocalStorage', () => {
    const user = { token: '12345' }
    window.localStorage.setItem('user', JSON.stringify(user))    
})

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

Cypress.Commands.add('register', (firstName, lastName, username, password) => {
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
        console.log(resp.body)
        return resp.body.id
    })    
})

Cypress.Commands.add('delete', (id) => {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:4000/users/${id}`,
    }).then((resp) => {
        expect(resp.status).to.eq(204)
    })   
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
