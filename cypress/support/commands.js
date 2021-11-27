Cypress.Commands.add('login', (username, password) => { 
    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/users/authenticate',
        body: {
            username: username,
            password: password
        }
    }).then((resp) => {
        expect(resp.status).to.eq(200)
        window.localStorage.setItem('user', JSON.stringify(resp.body))
    })
    cy.visit('http://localhost:8080')
 })


