export default function makeLogInUserC({logInUser}) {
    return async function logInUserC({...userInfo}) {
        try {
            const user = await logInUser(userInfo);
            return user            
        } catch (e) {
            console.log(e);
            return 'Cannot logIn';
        }
    }
}