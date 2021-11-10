/// <reference types="cypress" />

import {loginPage} from "../pages/loginPage";
import {homePage} from "../pages/homePage";

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should successfully login', () => {
        loginPage.login('slawenty', 'password')
        homePage.verifyTitleContains('Slawomir')
    })

    it('should open register page', () => {
        loginPage.clickRegister()
        cy.url().should('contain', 'register')
    })

})