import makeAddUser from './add-user';
import makeListUser from './list-user';
import makeListUsers from './list-users';
import makeLoginUser from './login-user';
import makeUser from '../user';
import usersDB from '../data-access';

const addUser = makeAddUser(usersDB,makeUser);
const listUser = makeListUser(usersDB);
const listUsers = makeListUsers(usersDB);
const logInUser = makeLoginUser(usersDB);

const userService = Object.freeze({
    addUser, 
    listUser,
    listUsers,
    logInUser,
});

export default userService;
export {addUser, listUser, listUsers, logInUser};