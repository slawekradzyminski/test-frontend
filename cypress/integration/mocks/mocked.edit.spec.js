/// <reference types="cypress" />

const { getRandomString } = require('../../util/random')

describe('Edit page with mocks', () => {

    const users = require('../../fixtures/users.json')

    beforeEach(() => {
        cy.setTokenInLocalStorage()
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.intercept('GET', `**/users/${users[2].id}`, { fixture: 'gosiakowalska.json' })
        cy.visit('')
    })

    it('should correctly autocomplete fields', () => {
        // when
        cy.get('ul li').eq(2).find('.edit').click()

        // then
        verifyUserDataAutocompleted(users[2])
    })

    it('should edit user', () => {
        // given
        const newFirstName = getRandomString()
        const newLastName = getRandomString()
        const newUsername = getRandomString()
        const newPassword = getRandomString()

        cy.get('ul li').eq(2).find('.edit').click()
        cy.get("[name='firstName']").clear().type(newFirstName)
        cy.get("[name='lastName']").clear().type(newLastName)
        cy.get("[name='username']").clear().type(newUsername)
        cy.get("[name='password']").clear().type(newPassword)

        const id = users[2].id
        cy.intercept('PUT', `**/users/${id}`, {
            statusCode: 200,
            body: {
                id: id,
                firstName: newFirstName,
                lastName: newLastName,
                username: newUsername,
                password: newPassword,
            }
        }).as('putRequest')

        // when
        cy.get('button').click()

        // then
        cy.wait('@putRequest').its('request.body')
            .should('deep.equal', {
                id: id,
                firstName: newFirstName,
                lastName: newLastName,
                username: newUsername,
                password: newPassword,
            })

    })

})

const verifyUserDataAutocompleted = (user) => {
    cy.get("[name='firstName']").should('have.value', user.firstName)
    cy.get("[name='lastName']").should('have.value', user.lastName)
    cy.get("[name='username']").should('have.value', user.username)
    cy.get("[name='password']").should('have.value', user.password)
}

