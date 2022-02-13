/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('Edit page', () => {
    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()
    const lastName = getRandomString()
    const newUsername = getRandomString()
    const newPassword = getRandomString()
    const newFirstName = getRandomString()
    const newLastName = getRandomString()
    let id

    before(() => {
        cy.register(username, password, firstName, lastName)
    })

    after(() => {
        cy.deleteUser(id)
    })

    beforeEach(() => {
        cy.login(username, password).then(returnedId => id = returnedId)
        cy.visit('')
        cy.get('ul li').contains(`${firstName} ${lastName}`).find('.edit').click()
    })

    it('should edit an user', () => {
        cy.get('[name=username]').clear().type(newUsername)
        cy.get('[name=firstName]').clear().type(newFirstName)
        cy.get('[name=lastName]').clear().type(newLastName)
        cy.get('[name=password]').clear().type(newPassword)
        cy.get('.btn-primary').click()

        cy.get('ul li').contains(`${firstName} ${lastName}`).should('not.exist')
        cy.get('ul li').contains(`${newFirstName} ${newLastName}`).should('be.visible')

        cy.request(`http://localhost:4000/users/${id}`).then(resp => {
            expect(resp.body).to.deep.eq({
                username: newUsername,
                password: newPassword,
                firstName: newFirstName,
                lastName: newLastName,
                id: id
            })
        })
    })

})
