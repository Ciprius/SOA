import makeGetUser from './get_user';
import makePostUser from './post_user';
import makeGetUsers from './get_users';
import makeLogInUserC from './login-user-c';
import {
    listUser,
    addUser,
    listUsers,
    logInUser
} from '../use-cases';

const getUser = makeGetUser({listUser});
const getUsers = makeGetUsers({listUsers});
const postUser = makePostUser({addUser});
const logInUserC = makeLogInUserC({logInUser});

const userController = Object.freeze({
    getUser,
    postUser,
    getUsers,
    logInUserC
});

export default userController;
export {getUser, postUser, getUsers, logInUserC};