/// <reference types="cypress" />

import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import { getRandomString } from "../util/random"

const registerPage = new RegisterPage()
const loginPage = new LoginPage()

describe('Register page', () => {
    let id

    beforeEach(() => {
        id = undefined
        cy.visit('/register')
    })

    afterEach(() => {
        if (typeof (id) !== 'undefined') {
            cy.deleteUser(id)
        }
    })

    it('should successfully register', () => {
        const username = getRandomString()
        registerPage.attemptRegister(username, getRandomString(), getRandomString(), getRandomString())
        loginPage.verifyRegistrationSucceeded(username).then(id => id = id)
    })

    it('should fail to register', () => {
        const username = getRandomString()
        cy.register(username, getRandomString(), getRandomString(), getRandomString())
            .then(returnedId => id = returnedId)

        registerPage.attemptRegister(username, getRandomString(), getRandomString(), getRandomString())
        registerPage.verifyRegistrationFailed()
    })

    it('should redirect back to login page', () => {
        registerPage.clickCancelLink()
        cy.url().should('contain', 'login')
    })

    it('should not be able to register without username', () => {
        registerPage.attemptRegister('', getRandomString(), getRandomString(), getRandomString())
        registerPage.verifyFrontendValidation('Username is required', registerPage.usernameField)
    })

    it('should not be able to register without first name', () => {
        registerPage.attemptRegister(getRandomString(), getRandomString(), '', getRandomString())
        registerPage.verifyFrontendValidation('First Name is required', registerPage.firstNameField)
    })

    it('should not be able to register without last name', () => {
        registerPage.attemptRegister(getRandomString(), getRandomString(), getRandomString(), '')
        registerPage.verifyFrontendValidation('Last Name is required', registerPage.lastNameField)
    })

    it('should not be able to register without password', () => {
        registerPage.attemptRegister(getRandomString(), '', getRandomString(), getRandomString())
        registerPage.verifyFrontendValidation('Password is required', registerPage.passwordField)
    })

})
