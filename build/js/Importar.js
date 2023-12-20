import axios from 'axios';
import { defineStore } from "pinia";
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, 
		signInWithEmailAndPassword,
		onAuthStateChanged,
		signOut} from "firebase/auth";
import { collection, query, where, getDoc, 
		getDocs, addDoc, deleteDoc, doc,
		updateDoc } from 'firebase/firestore'
import router from '../router';
import { nanoid } from 'nanoid';