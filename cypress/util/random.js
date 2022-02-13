export const getRandomString = () => `cypress${Math.random().toString(36).substring(7)}`

export const getRandomNumber = () => Math.floor(Math.random() * 100);
