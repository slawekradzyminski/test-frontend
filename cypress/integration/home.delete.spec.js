/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('Home page delete tests', () => {

    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()
    const lastName = getRandomString()

    let userId

    before(() => {
        cy.register(username, password, firstName, lastName)
            .then(id => userId = id)
    })

    beforeEach(() => {
        cy.login(username, password)
    })

    it('should delete myself', () => {
        // when
        cy.get('ul li').contains(`${firstName} ${lastName}`).find('.delete').click()

        // then
        cy.assertUserNotExists(userId)
    })

})
