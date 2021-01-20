export default function makeAddUser(usersDB, makeUser) {
    return async function addUser(userInfo) {
        const user = makeUser(userInfo);
        
        return usersDB.insert({
            id: user.getUserId(),
            userName: user.getUserName(),
            password: user.getUserPassword(),
        });
    }
}