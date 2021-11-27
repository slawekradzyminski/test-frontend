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

    beforeEach(() => {
        cy.visit('http://localhost:8080')
        cy.login(username, password)
    })
  
    it('should display at least one user', () => {
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
  
  })
  