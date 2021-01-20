export default function makePostUser({addUser}) {
    return async function postUser(userInfo) {
        try {
            const user = await addUser(userInfo);
            return user;
        } catch (e) {
            console.log(e);
            return 'Unable to add user';
        }
    }
}