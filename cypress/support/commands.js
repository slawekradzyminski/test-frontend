Cypress.Commands.add('login', (username, password) => {
    cy.visit('')
    cy.get('[name=username]').type(username)
    cy.get('[name=password]').type(password)
    cy.get('.btn-primary').click()
})
