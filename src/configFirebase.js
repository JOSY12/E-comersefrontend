import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FB_API_KEY}`,
    authDomain: `${process.env.REACT_APP_FB_AUTH_DOMAIN}`,
    projectId: `${process.env.REACT_APP_FB_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_FB_STORAGE}`,
    messagingSenderId: `${process.env.REACT_APP_FB_MESSAGING}`,
    appId: `${process.env.REACT_APP_FB_API_ID}`,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
    const storageRef = ref(storage, "img" + v4());
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}