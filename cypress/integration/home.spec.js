/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('Home page', () => {

    const username = getRandomString()
    const password = getRandomString()
    let userId

    before(() => {
        cy.register(username, password, getRandomString(), getRandomString())
            .then(id => userId = id)
    })

    after(() => {
        cy.deleteUser(userId)
    })

    beforeEach(() => {
        cy.login(username, password)
    })

    it('should delete other user', () => {
        // given
        let userIdToDelete
        const firstName = getRandomString()
        const lastName = getRandomString()
        cy.register(getRandomString(), getRandomString(), firstName, lastName)
            .then(id => userIdToDelete = id)
            .then(() => {
                cy.visit('')
                // when
                cy.get('ul li').contains(`${firstName} ${lastName}`).find('.delete').click()

                // then
                cy.assertUserNotExists(userIdToDelete)
            })
    })

    it('should show at least 1 user', () => {
        // then
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('logout button should work', () => {
        // when
        cy.get('#logout').click()

        // then
        cy.url().should('contain', 'login')
    })

    it('add more button should work', () => {
        // when
        cy.get('#addmore').click()

        // then
        cy.url().should('contain', 'add-user')
        cy.get('h2').should('have.text', 'Add user')
    })

})
