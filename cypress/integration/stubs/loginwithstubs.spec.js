/// <reference types="cypress" />

context('Login', () => {

    const getRandomString = () => {
        return Math.random().toString(36).substring(7)
    }

    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()
    const lastName = getRandomString()
    let userId

    beforeEach(() => {
        cy.visit('/')
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
    })

    it('should fail to login', () => {
        const loginFailedMessage = "Login failed - bad username or password";
        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 401,
            body: {
                "message": loginFailedMessage
            }
        }).as('loginRequest')

        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('button').click()
        cy.get('.alert').should('have.text', loginFailedMessage)
    })

    it('should handle network error', () => {
        cy.intercept('POST', '**/users/authenticate', { forceNetworkError: true })
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('button').click()
        cy.get('.alert').contains('Failed to fetch')
    })

    it('should work', () => {
        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 200,
            body: {
                "id": 56,
                username,
                firstName,
                lastName,
                "token": "123456"
            }
        }).as('loginRequest')

        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('button').click()
        cy.get('h1').should('have.text', `Hi ${firstName}!`)
        cy.get('h1').contains('Hi')

        cy.get('ul li').should('have.length', 2)

        cy.wait('@loginRequest')
            .its('request.body')
            .should('deep.equal', { username, password })
    })

})
