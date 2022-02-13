/// <reference types="cypress" />

const { getRandomString } = require('../../util/random')

describe('Home page in isolation', () => {
    const newUsername = getRandomString()
    const newPassword = getRandomString()
    const newFirstName = getRandomString()
    const newLastName = getRandomString()

    const users = require('../../fixtures/users.json')
    const jozek = users[users.length - 1]

    beforeEach(() => {
        cy.setFakeTokenInLocalStorage()
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.intercept('GET', `**/users/${jozek.id}`, { fixture: 'jozek.json' })
        cy.visit('/')
        cy.get('ul li').contains(`${jozek.firstName} ${jozek.lastName}`).find('.edit').click()
    })

    it('should edit an user', () => {
        cy.intercept('PUT', `**/users/${jozek.id}`, {
            statusCode: 200,
            body: {
                id: jozek.id,
                firstName: newFirstName,
                lastName: newLastName,
                username: newUsername,
                password: newPassword
            }
        }).as('editRequest')

        cy.get('[name=username]').clear().type(newUsername)
        cy.get('[name=firstName]').clear().type(newFirstName)
        cy.get('[name=lastName]').clear().type(newLastName)
        cy.get('[name=password]').clear().type(newPassword)
        cy.get('.btn-primary').click()

        cy.wait('@editRequest').its('request.body')
            .should('deep.equal', {
                id: jozek.id,
                firstName: newFirstName,
                lastName: newLastName,
                username: newUsername,
                password: newPassword
            })
    })

})
