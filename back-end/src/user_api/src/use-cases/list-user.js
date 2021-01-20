export default function makeListUser(usersDB) {
    return async function listUser(userId) {
        const found = usersDB.findById({...userId});
        return found;
    }
}