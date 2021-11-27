/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('Home page - delete', () => {
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
        cy.checkUser(userId).then((statusCode) => {
            if (statusCode === 200) {
                cy.deleteUser(userId)
            }
        })
    })

    beforeEach(() => {
        cy.visit('http://localhost:8080')
        cy.login(username, password)
    })
  
    it('should delete user', () => {
        cy.get('ul li').contains(`${firstName} ${lastName}`).find('.delete').click()
        cy.get('ul li').should('not.contain.text', `${firstName} ${lastName}`)
    })

  })
  