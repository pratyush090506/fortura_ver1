import { GoogleAuthProvider, signInWithCredential, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

export const handleMobileLogin = async (phoneNumber, appVerifier) => {
    const phoneNumberString = `+91${phoneNumber}`;
    try {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumberString, appVerifier);
        return confirmationResult; 
    } catch (error) {
        throw new Error(error.message);
    }
};

export const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const credential = await signInWithCredential(auth, provider);
        return credential; 
    } catch (error) {
        throw new Error(error.message);
    }
};