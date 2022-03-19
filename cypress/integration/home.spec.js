/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('home page', () => {

    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()
    const lastName = getRandomString()
    let userId;

    before(() => {
        cy.register(username, password, firstName, lastName).then(returnedId => userId = returnedId)
    })

    after(() => {
        cy.deleteUser(userId)
    })

    beforeEach(() => {
        cy.login(username, password)
        cy.visit('http://localhost:8080')
    })

    it(`add should delete all users except ${firstName} ${lastName}`, () => {
        cy.get('ul li').each($element => {
            if (!$element.text().includes(`${firstName} ${lastName}`)) {
                cy.wrap($element).find('.delete').click()
            }
        })
 
        cy.get('ul li').should('have.length', 1)
     });

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should log user out', () => {
        cy.get('#logout').click()
        cy.url().should('contain', 'login')
        cy.get('h2').should('have.text', 'Login')
    })

    it('add more users', () => {
        cy.get('#addmore').click();
        cy.url().should("contain", 'add-user');
    });

    it('should not delete user if confirmation cancelled', () => {
        cy.on('window:confirm', (confirmationText) => {
            expect(confirmationText).to.eq('Are you sure you wish to delete this item?')
            return false
        })

        cy.get('ul li').contains(`${firstName} ${lastName}`).find('.delete').click()
        cy.get('ul li').contains(`${firstName} ${lastName}`).should('be.visible')
    });

})
