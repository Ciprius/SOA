export default function makeGetUser({listUser}) {
    return async function getUser(userId) {
        try {
            const user = await listUser(userId);
            return user;
        } catch (e) {
            console.log(e);
            return 'Could not get the user';
        }
    }
}