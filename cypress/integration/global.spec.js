/// <reference types="cypress" />

context('Common footer', () => {

    beforeEach(() => {
      cy.visit('/login')
    })

    it('Link should lead to cantest', () => {
      cy.get('p a').should('have.attr', 'href', 'https://cantest.it')  
    })
  
  })
  