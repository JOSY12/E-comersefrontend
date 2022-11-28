import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyC9EF6TQ8Ohvq5hCg1o-qho_PFF7lNtPgw",
  authDomain: "cloudinary-14ccf.firebaseapp.com",
  projectId: "cloudinary-14ccf",
  storageBucket: "cloudinary-14ccf.appspot.com",
  messagingSenderId: "499851684704",
  appId: "1:499851684704:web:b43bc05c8afcd3e1334c05",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
  const storageRef = ref(storage, "img" + v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
