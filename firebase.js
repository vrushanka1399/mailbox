import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBo8Pwmbti299m4tq4c--iyz2pdn5uB2S8",
  authDomain: "ecommerce-auth-c5f4b.firebaseapp.comYOUR_DOMAIN",
  projectId: "ecommerce-auth-c5f4b",
  storageBucket: "ecommerce-auth-c5f4b.firebasestorage.app",
  messagingSenderId: "136194214018",
  appId: "1:136194214018:web:0f2cd3a2e7611fe9774c9b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
