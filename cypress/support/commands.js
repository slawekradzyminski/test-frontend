Cypress.Commands.add('login', (username, password) => { 
    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/users/authenticate',
        body: {
          username: username,
          password: password,
        },
      }).then(response => {
        // cy.wrap(response.status).should('eq', 200)
        expect(response.status).to.eq(200)
        localStorage.setItem('user', JSON.stringify(response.body))
      })

 })
