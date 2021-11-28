const usernameField = '[name=username]'
const passwordField = '[name=password'
const firstNameField = '[name=firstName]'
const lastNameField = '[name=lastName]'
const saveButton = 'button'

export const editPage = {
    changeUserDetails: (user) => {
        cy.get(firstNameField).clear().type(user.firstName)
        cy.get(lastNameField).clear().type(user.lastName)
        cy.get(usernameField).clear().type(user.username)
        cy.get(passwordField).clear().type(user.password)
    },

    clickSaveUserDetails: () => {
        cy.get(saveButton).click()
    }
}