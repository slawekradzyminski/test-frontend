/// <reference types="cypress" />

const { editPage } = require('../../pages/editPage')
const { homePage } = require('../../pages/homePage')
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
        cy.get("[name='firstName']").should('have.value', users[2].firstName)
        cy.get("[name='lastName']").should('have.value', users[2].lastName)
        cy.get("[name='username']").should('have.value', users[2].username)
        cy.get("[name='password']").should('have.value', users[2].password)
    })

    const testUser = {
        id: users[2].id,
        firstName: getRandomString(),
        lastName: getRandomString(),
        username: getRandomString(),
        password: getRandomString()
    }

    it('should edit user', () => {
        // given
        homePage.clickEditUserWithIndex(2)
        cy.mockEditUser(testUser)

        // when
        editPage.changeUserDetails(testUser)
        editPage.clickSaveUserDetails()

        // then
        verifyCorrectRequestBody(testUser)
    })
})

const verifyCorrectRequestBody = (testUser) => {
    cy.wait('@putRequest').its('request.body')
        .should('deep.equal', {
            id: testUser.id,
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            username: testUser.username,
            password: testUser.password,
        })
}

