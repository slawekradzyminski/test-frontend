/// <reference types="cypress" />

context('Login test', () => {
    beforeEach(() => {
      const user = { token: '12345' }
      window.localStorage.setItem('user', JSON.stringify({ user }))
      cy.visit('/')
    })

    it('should login', () => {
        expect(cy.getCookie)
    })
  
  })