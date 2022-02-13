/// <reference types="cypress" />

import EditPage from "../pages/EditPage"
import HomePage from "../pages/HomePage"
import { getRandomString } from "../util/random"

const homePage = new HomePage()
const editPage = new EditPage()

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
        homePage.editUser(firstName, lastName)
    })

    it('should edit an user', () => {
        editPage.attemptToEdit(newUsername, newFirstName, newLastName, newPassword)
        homePage.verifyUserDisplayed(newFirstName, newLastName)
        homePage.verifyUserDoesNotDisplayed(firstName, lastName)
        cy.verifyUserExistsViaApi(newUsername, newPassword, newFirstName, newLastName, id)
    })

})
