Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/users/authenticate',
        body: { username, password }
    }).then((resp) => {
        expect(resp.status).to.eq(200)
        window.localStorage.setItem('user', JSON.stringify(resp.body))
    })
    cy.visit('/')
})

Cypress.Commands.add('register', (username, password, firstName, lastName) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/users/register',
        body: { username, password, lastName, firstName }
    }).then((resp) => {
        expect(resp.status).to.eq(201)
        return resp.body.id
    })
})

Cypress.Commands.add('deleteUser', (id) => {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:4000/users/${id}`,
    }).then((resp) => {
        expect(resp.status).to.eq(204)
    })
})

