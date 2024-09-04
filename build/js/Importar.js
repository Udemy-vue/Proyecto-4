import axios from 'axios';
import { defineStore } from "pinia";
import { auth, db, storage } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, 
		signInWithEmailAndPassword,
		onAuthStateChanged,
		signOut, updateProfile} from "firebase/auth";
import { collection, query, where, getDoc, 
		getDocs, addDoc, deleteDoc, doc,
		updateDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage'
import router from '../router';
import { nanoid } from 'nanoid';
import { errorAutentication } from "../../src/Constans";
import { message } from "ant-design-vue";