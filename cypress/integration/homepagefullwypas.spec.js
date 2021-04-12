/// <reference types="cypress" />

context('Home page full wypas', () => {

    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()
    const lastName = getRandomString()

    let userId

    before(() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:4000/users/register',
            body: {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password
            }
        }).then((resp) => {
            expect(resp.status).to.eq(201)
            userId = resp.body.id
        })    
    })

    beforeEach(() => {
        cy.login(username, password)
        cy.visit('/')
    })

    after(() => {
        cy.delete(userId)
    })

    it('Should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it('Should logout', () => {
        cy.get('#logout').click()
        cy.url().should('include', '/login')
        cy.get('h2').contains('Login')
        cy.checkUserKeyNull()
    })

    function getRandomString() {
        return Math.random().toString(36).substring(7)
    }

})
