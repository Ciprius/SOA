export default function makeLoginUser(usersDB) {
    return async function logInUser({...userInfo}) {
        const user = usersDB.findByUserNameAndPassword(userInfo);
        return user;
    }
}