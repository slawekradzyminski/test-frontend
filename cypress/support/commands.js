Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/users/authenticate',
        body: { username, password }
    }).then(resp => {
        cy.wrap(resp.status).should('eq', 200)
        expect(resp.status).to.eq(200)
        window.localStorage.setItem('user', JSON.stringify(resp.body))
    })
    cy.visit('')
})

Cypress.Commands.add('register', (username, password, firstName, lastName) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/users/register',
        body: { username, password, firstName, lastName }
    }).then(resp => {
        expect(resp.status).to.eq(201)
        return resp.body.id
    })
})

Cypress.Commands.add('deleteUser', (id) => {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:4000/users/${id}`,
    }).then(resp => {
        expect(resp.status).to.eq(204)
    })
})

Cypress.Commands.add('assertUserNotExists', (id) => {
    cy.request({
        method: 'GET',
        url: `http://localhost:4000/users/${id}`,
        failOnStatusCode: false
    }).then(resp => {
        expect(resp.status).to.eq(404)
    })
})
