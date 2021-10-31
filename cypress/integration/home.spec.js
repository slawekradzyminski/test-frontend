/// <reference types="cypress" />

import { getRandomString } from '../util/randomUtil'

describe('Home page', () => {
    const username = getRandomString()
    const password = getRandomString()
    let userId

    before(() => {
        cy.register(username, password, getRandomString(), getRandomString()).then((id) => {
            userId = id
        })
    })

    after(() => {
        cy.deleteUser(userId)
    })

    beforeEach(() => {
        cy.login(username, password)
        cy.visit('/')
    })
  
    it('should display users', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('include', '/login')
    })

    it('should go to add user', () => {
        cy.get('#addmore').click()
        cy.url().should('include', '/add-user')
    })
  
  })