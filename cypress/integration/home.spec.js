/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('Home page', () => {
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
        cy.visit('/')
        cy.login(username, password)
    })
  
    it('should display at least one user', () => {
        cy.viewport('iphone-xr')
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should open add more users page', () => {
        cy.get('#addmore').click()
        cy.url().should('eq', 'http://localhost:8080/add-user')
    })
  
    it('should have correct link url', () => {
        cy.get('.text-center a').should('have.attr', 'href', 'https://cantest.it')
    })

  })
  