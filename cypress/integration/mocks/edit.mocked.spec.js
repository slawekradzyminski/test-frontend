/// <reference types="cypress" />

import users from '../../fixtures/users.json'
import { getRandomString } from '../../util/random'

describe('Mocked edit', () => {

    const testUser = users[0]

    beforeEach(() => {
        cy.setTokenInLocalStorage()
        cy.intercept('GET', '**/users', { body: users })
        cy.intercept('GET', '**/users/1', { body: testUser })
        cy.visit('')
    })

    it('should display all users', () => {
        // when
        cy.get('ul li').contains(`${testUser.firstName} ${testUser.lastName}`).find('.edit').click()

        // then
        cy.get('[name=firstName]').should('have.value', testUser.firstName)
        cy.get('[name=lastName]').should('have.value', testUser.lastName)
        cy.get('[name=username]').should('have.value', testUser.username)
        cy.get('[name=password]').should('have.value', testUser.password)
    })

    it('should edit user', () => {
        // given
        const newUsername = getRandomString()
        const newPassword = getRandomString()
        const newFirstName = getRandomString()
        const newLastName = getRandomString()
        cy.get('ul li').contains(`${testUser.firstName} ${testUser.lastName}`).find('.edit').click()
        cy.get('[name=firstName]').clear().type(newFirstName)
        cy.get('[name=lastName]').clear().type(newLastName)
        cy.get('[name=username]').clear().type(newUsername)
        cy.get('[name=password]').clear().type(newPassword)

        cy.intercept('PUT', `/users/${testUser.id}`, {
            statusCode: 200,
            body: {
                id: testUser.id,
                firstName: newFirstName,
                lastName: newLastName,
                username: newUsername,
                password: newPassword
            }
        }).as('putRequest')

        // when
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert-success').should('have.text', 'Updating user successful')
        cy.wait('@putRequest').its('request.body')
            .should('deep.equal', {
                id: testUser.id,
                firstName: newFirstName,
                lastName: newLastName,
                username: newUsername,
                password: newPassword
            })
    })

})
