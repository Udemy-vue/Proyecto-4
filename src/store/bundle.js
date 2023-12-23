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
export const useUserStore = defineStore("user", {
  state: () => ({
      userData: "bluuweb",
      userInfo: {},
      loadingUser: false,
      loading: true,
      loadingSession: false,
      selectedKeys: ['2']
  }),
  getters: {
    minuscula(state) {
      return state.userData.toLowerCase();
    },
    mayusculaInicial(state) {
      return state.userData.replace(/\b\w/g, (match) => match.toUpperCase())
    },
    mayuscula(state) {
      return state.userData.toUpperCase();
    }
  }, 
  actions: {
    registro(name) {
      this.userData = name;
    },
    
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // console.log(user);
        this.userInfo = { email: user.email, uid: user.uid }
        this.loading = false;
        router.push("/");
      } catch (e) {
        console.log(e);
        this.userInfo = {};
      } finally {
        this.loadingUser = false;
      }
    },

    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        // console.log(user);
        this.userInfo = {
          email: user.email,
          uid: user.uid
        };
        this.loading = false;
        router.push("/");
      } catch(e) {
        // statements
        console.log(e);
        this.userInfo = {};
      } finally {
        this.loadingUser = false;
      }
    }, 

    async signOutUser() {
      this.loadingUser = true;
      try {
        await auth.signOut();
        this.userInfo = {};
        this.loading = true;
        router.push("/login");
        this.selectedKeys = ["2"];
      } catch(e) {
        // statements
        console.log(e);
      } finally {
        // statements
        this.loadingUser = false;
      }
    },

    currentUser() {
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            this.userInfo = {
              email: user.email,
              uid: user.uid
            };
          } else {
            this.userInfo = {};
          }
          resolve(user);
        }, (error) => {
          console.error('Error en onAuthStateChanged:', error);
          reject(error);
        });

        // Dependiendo de tus necesidades, puedes o no querer desuscribirte inmediatamente.
        // Si lo haces, solo recibirás el primer cambio y luego dejarás de escuchar.
        // Si no lo haces, seguirás escuchando cambios hasta que el componente sea destruido o hasta que desactives manualmente el listener.
        // unsubscribe();
      });
    }
  }
});

export const useDatabaseStore = defineStore('database', {
	state: () => ({
		documents: [],
		loadingDoc: false,
		userUid: ''
	}),
	getters: {

	},
	actions: {
		async getUrls() {
			if (this.documents.length !== 0) {
				return;
			}
			this.loadingDoc = true;
			this.documents = [];
			try {
				 const q = query(collection(db, 'urls'), 
				 	where("user", "==", auth.currentUser.uid));
				 const querySnapshot = await getDocs(q)
				 querySnapshot.forEach((doc) => {
				 	// console.log(doc.id, doc.data());
				 	this.documents.push({
				 		id: doc.id,
				 		...doc.data()
				 	});
				 });
				 // console.log(this.documents);
			} catch(e) {
				// statements
				console.log(e);
			} finally {
				// statements
				this.loadingDoc = false;
			}
		},
		signOutUser() {
			this.documents = [];
		},
		lectura(texto) {
			console.log("hola a todos", texto)
		},
		async addUrl(name) {
			this.loadingDoc = true;
			try {
				const objetoDoc = {
					name: name,
					short: nanoid(6),
					user: auth.currentUser.uid
				};
				const docRef = await addDoc(collection(db, "urls"), objetoDoc);
				// console.log(docRef);
				this.documents.push({
					...objetoDoc,
					id: docRef.id
				});
			} catch(e) {
				// statements
				console.log(e);
			} finally {
				// statements<
				this.loadingDoc = false;
			}
		},
		async deleteUrl(id) {
			this.loadingDoc = true;
			try {
				const docRef = await doc(db, "urls", id);
				const docSnap = await getDoc(docRef);

				if (!docSnap.exists()) {
					throw new Error('no existe el documentos');
				}
				if(docSnap.data().user !== auth.currentUser.uid) {
					throw new Error('no existe el documentos');
				}
				await deleteDoc(docRef);
				this.documents = this.documents.filter(item => item.id !== id)
			} catch(e) {
				// statements
				console.log(e);
			} finally {
				// statements
				this.loadingDoc = false;
			}
		},

		async readUrl() {
			this.loadingDoc = true;
			try {
				const docRef = await doc(db, "urls", this.userUid);
				const docSnap = await getDoc(docRef);

				if (!docSnap.exists()) {
					throw new Error('no existe el documentos');
				}
				if(docSnap.data().user !== auth.currentUser.uid) {
					throw new Error('no existe el documentos');
				}
				return docSnap.data().name;
			} catch(e) {
				// statements
				console.log(e);
			} finally {
				// statements
				this.loadingDoc = false;
			}
		},

		async updateUrl(name){
			// console.log(name);
			this.loadingDoc = true;
			try {
				const docRef = await doc(db, "urls", this.userUid);
				const docSnap = await getDoc(docRef);

				if (!docSnap.exists()) {
					throw new Error('no existe el documentos');
				}
				if(docSnap.data().user !== auth.currentUser.uid) {
					throw new Error('no existe el documentos');
				}
				await updateDoc(docRef, { name: name });
				this.documents = this.documents.map((item) => 
					item.id === this.userUid ? { ...item, name: this.userUid } : item
				);
				router.push("/");
			} catch(e) {
				// statements
				console.log(e);
			} finally {
				// statements
				this.loadingDoc = false;

			}
		},
		returnData() {
			this.loadingDoc = true;

			try {
				// statements
				router.push('/');
			} catch(e) {
				// statements
				console.log(e);
			} finally {
				this.loadingDoc = false;
				// statements
			}
		}
	}
})
//# sourceMappingURL=bundle.js.map
