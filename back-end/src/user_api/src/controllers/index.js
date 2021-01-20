import makeGetUser from './get_user';
import makePostUser from './post_user';
import {
    listUser,
    addUser,
} from '../use-cases';

const getUser = makeGetUser({listUser});
const postUser = makePostUser({addUser});

const userController = Object.freeze({
    getUser,
    postUser
});

export default userController;
export {getUser, postUser};