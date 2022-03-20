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

 Cypress.Commands.add('register', (username, password, firstName, lastName) => { 
    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/users/register',
        body: {
            firstName: firstName,
            lastName: lastName,
            password: password,
            username: username
        }
    }).then(resp => {
        expect(resp.status).to.eq(201)
        return resp.body.id
    })
 })

 Cypress.Commands.add('deleteUser', (userId) => { 
    cy.request({
        method: 'DELETE',
        url: `http://localhost:4000/users/${userId}`,
    }).then(resp => {
        expect(resp.status).to.eq(204)
    })
 })

 Cypress.Commands.add('setTokenInLocalStorage', () => { 
    const user = { token: '12345' }
    localStorage.setItem('user', JSON.stringify(user))
 })
