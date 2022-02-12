Cypress.Commands.add('login', (username, password) => { 
    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/users/authenticate',
        body: {
          username: username,
          password: password,
        },
      }).then(resp => {
          expect(resp.status).to.eq(200)
          localStorage.setItem('user', JSON.stringify(resp.body))
      })
 })

 Cypress.Commands.add('register', (username, password, firstName, lastName) => { 
    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/users/register',
        body: {
            firstName: firstName,
            username: username,
            password: password,
            lastName: lastName
        }
    }).then(resp => {
        expect(resp.status).to.eq(201)
    })
 })

