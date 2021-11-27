/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('Edit page', () => {
    let userId

    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()
    const lastName = getRandomString()

    before(() => {
        cy.register(username, password, firstName, lastName).then((id) => {
            userId = id
        })
    })

    after(() => {
        cy.deleteUser(userId)
    })

    beforeEach(() => {
        cy.visit('http://localhost:8080')
        cy.login(username, password)
    })
  
    it('should correctly autocomplete data', () => {
        cy.get('ul li').contains(`${firstName} ${lastName}`).find('.edit').click()
        cy.get("[name='firstName']").should('have.value', firstName)
        cy.get("[name='lastName']").should('have.value', lastName)
        cy.get("[name='username']").should('have.value', username)
        cy.get("[name='password']").should('have.value', password)
    })

  })
  