
// this function simulates the interaction with a database
// We keep the usersname and password in a simple array in storage
// The shape would be: [{123@saintmary.co, password}]
const STORAGE_KEY = 'health_db'
export const checkIfCanLogin = (username, password) => {
    const db = localStorage.getItem(STORAGE_KEY);

    if (!db) {
        return false;
    }

    const parsedDb = JSON.parse(db)

    let isRegistered = false
    parsedDb.forEach((user) => {
        console.log({ user })
        if (user.username === username && user.password === password) {
            isRegistered = true
        }
    })


    return isRegistered;
}