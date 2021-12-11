/// <reference types="cypress" />

describe('Footer', () => {

    beforeEach(() => {
      cy.visit('')
    })
  
    it('should have correct url', () => {
        cy.get('.text-center a').should('have.attr', 'href', 'https://cantest.it')
    })

  })
  