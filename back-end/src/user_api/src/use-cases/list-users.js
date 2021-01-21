export default function makeListUsers(usersDB) {
    return async function listUsers() {
        const found = usersDB.findAll();
        return found;
    }
}