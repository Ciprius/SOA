export default function makeAddUser(usersDB, makeUser) {
    return async function addUser(userInfo) {
        const user = makeUser(userInfo);
        const exists = await usersDB.findByUserNameAndPassword({
            userName: user.getUserName(),
            password: user.getUserPassword(),
        });  
        
        if (exists?.length) {
            return null;
        }
        
        return usersDB.insert({
            userName: user.getUserName(),
            password: user.getUserPassword(),
        });
    }
}