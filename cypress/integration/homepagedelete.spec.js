/// <reference types="cypress" />

context('Home page', () => {

    const firstName = getRandomString()
    const lastName = getRandomString()
    const username = getRandomString()
    const password = getRandomString()

    let id

    beforeEach(() => {
        cy.login(username, password)
        cy.visit('/')
    })

    before(() => {
        cy.register(firstName, lastName, username, password).then((userId) => {
            id = userId
        })
    })

    it('should delete user', () => {
        cy.get('ul li').contains(`${firstName} ${lastName}`).find('.delete').click()
        cy.request({
            method: 'GET',
            url: `http://localhost:4000/users/${id}`,
            failOnStatusCode: false
        }).then((resp) => {
            expect(resp.status).to.eq(404)
        })
    })

    function getRandomString() {
        return Math.random().toString(36).substring(7)
    }

})
