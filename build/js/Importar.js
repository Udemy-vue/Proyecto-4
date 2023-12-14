import axios from 'axios';
import { defineStore } from "pinia";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, 
		signInWithEmailAndPassword,
		onAuthStateChanged,
		signOut} from "firebase/auth";
import router from "../router";