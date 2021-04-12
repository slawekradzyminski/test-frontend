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
    })

    after(() => {
        cy.delete(userId)
    })

    it('Should show correct data initially', () => {
        cy.visit('/')
        cy.get('li').contains(firstName).find('.edit').click()
        cy.get('.btn-primary').contains('Save')
        cy.get('[name=username]').should('have.value', username)
        cy.get('[name=firstName]').should('have.value', firstName)
        cy.get('[name=lastName]').should('have.value', lastName)
    })

    it('Should go back to home page after clicking Cancel', () => {
        const userToEdit = { 
            id: userId,
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName
         }
        window.localStorage.setItem('userToEdit', JSON.stringify(userToEdit))      

        cy.visit('/edit-user')
        cy.get('.btn-primary').contains('Save')
        cy.get('.btn-link').click()
        cy.url().should('not.include', 'edit')
    })

    function getRandomString() {
        return Math.random().toString(36).substring(7)
    }

})
