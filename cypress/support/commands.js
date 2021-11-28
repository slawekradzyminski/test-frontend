import { getRandomString } from "../util/random"

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
    cy.visit('http://localhost:8080')
})

Cypress.Commands.add('register', (username, password, firstName, lastName) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/users/register',
        body: {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName
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

Cypress.Commands.add('checkUser', (id) => {
    cy.request({
        method: 'GET',
        url: `http://localhost:4000/users/${id}`,
        failOnStatusCode: false
    }).then((resp) => {
        return resp.status
    })
})

Cypress.Commands.add('mockSuccessfulLogin', (firstName) => {
    cy.intercept('POST', '**/users/authenticate', {
        statusCode: 200,
        body: {
            id: 1,
            token: "12345",
            username: getRandomString(),
            lastName: getRandomString(),
            firstName: firstName
        }
    }).as('loginRequest')
})

Cypress.Commands.add('verifyCorrectLoginRequestBody', (username, password) => {
    cy.wait('@loginRequest').its('request.body')
        .should('deep.equal', {
            username: username,
            password: password
        })
})

Cypress.Commands.add('mockSuccessfulLoginRegister', () => {
    cy.intercept('POST', '**/users/register', {
        statusCode: 201,
        body: {
            id: 1,
            username: getRandomString(),
            firstName: getRandomString(),
            lastName: getRandomString(),
            password: getRandomString()
        }
    }).as('registerRequest')

})

Cypress.Commands.add('verifyCorrectRegisterRequestBody',
    (username, password, firstName, lastName) => {
        cy.wait('@registerRequest').its('request.body')
            .should('deep.equal', { username, password, firstName, lastName })
    })

Cypress.Commands.add('setTokenInLocalStorage', () => {
    const user = { token: '12345' }
    window.localStorage.setItem('user', JSON.stringify({ user }))
})

Cypress.Commands.add('mockEditUser', (testUser) => {
    cy.intercept('PUT', `**/users/${testUser.id}`, {
        statusCode: 200,
        body: {
            id: testUser.id,
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            username: testUser.username,
            password: testUser.password,
        }
    }).as('putRequest')
})




