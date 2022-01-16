/// <reference types="cypress" />

import { getRandomString } from '../../util/random'

describe('home page with mocks', () => {
    const users = require('../../fixtures/users.json')

    beforeEach(() => {
        cy.setTokenInLocalStorage()
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('')
        cy.intercept('GET', `**/users/${users[0].id}`, { fixture: 'firstUser.json' })
        cy.get('ul li').contains(`${users[0].firstName} ${users[0].lastName}`).find('.edit').click()
    })

    it('should autofill user data', () => {
        cy.get('[name=firstName]').should('have.value', users[0].firstName)
        cy.get('[name=lastName]').should('have.value', users[0].lastName)
        cy.get('[name=username]').should('have.value', users[0].username)
        cy.get('[name=password]').should('have.value', users[0].password)
    })

    it('should update user data', () => {
        const newFirstName = getRandomString()
        const newLastName = getRandomString()
        const newUsername = getRandomString()
        const newPassword = getRandomString()

        cy.intercept('PUT', `**/users/${users[0].id}`, {
            statusCode: 200,
            body: {
                id: users[0].id,
                firstName: newFirstName,
                lastName: newLastName,
                username: newUsername,
                password: newPassword
            }
        }).as('editRequest')

        cy.get('[name=firstName]').clear().type(newFirstName)
        cy.get('[name=lastName]').clear().type(newLastName)
        cy.get('[name=username]').clear().type(newUsername)
        cy.get('[name=password]').clear().type(newPassword)
        cy.get('button').click()

        cy.wait('@editRequest').its('request.body')
            .should('deep.equal', {
                id: users[0].id,
                firstName: newFirstName,
                lastName: newLastName,
                username: newUsername,
                password: newPassword
            })
    })


})