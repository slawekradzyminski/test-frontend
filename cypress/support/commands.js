Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/users/authenticate',
        body: {
            username: username,
            password: password
        }
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
        body: {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName
        }
    }).then(resp => {
        expect(resp.status).to.eq(201)
    })
})
