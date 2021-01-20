export default function buildMakeUser() {
    return function makeUser({
        id,
        userName,
        password,
    } = {}) {
        if (!userName) {
            throw new Error('The user must have a name');
        }
        if (!password) {
            throw new Error('The user must have a password');
        }
        
        return Object.freeze({
            getUserName: () => userName,
            getUserPassword: () => password,
            getUserId: () => id,
        });
    }
}