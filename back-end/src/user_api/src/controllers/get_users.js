export default function makeGetUsers({listUsers}) {
    return async function getUsers() {
        try {
            const users = await listUsers();
            return users;
        } catch (e) {
            console.log(e);
            return 'Could not get the user';
        }
    }
}