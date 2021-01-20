import makeAddUser from './add-user';
import makeListUser from './list-user';
import makeUser from '../user';
import usersDB from '../data-access';

const addUser = makeAddUser(usersDB,makeUser);
const listUser = makeListUser(usersDB);

const userService = Object.freeze({
    addUser, 
    listUser,
});

export default userService;
export {addUser, listUser};