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
export const useUserStore = defineStore("user", {
  state: () => ({
      userData: "bluuweb",
      userInfo: {},
      loadingUser: false,
      loading: false,
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
        console.log(e.code);
        return e.code
        this.userInfo = {};
      } finally {
        this.loadingUser = false;
      }
    },

    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const {user} = await signInWithEmailAndPassword(auth, email, password);
        this.loading = false;
        await this.setUser(user);
        router.push("/");
        return 'ok';
      } catch(e) {
        // statements
        this.userInfo = {};
        return e.code;
      } finally {
        this.loadingUser = false;
      }
    },

    async updateImg(image) {
      this.loadingUser = true;
      try {
        // console.log(image);
        const storageRef = ref(storage, `${this.userInfo.uid}/perfil`);
        await uploadBytes(storageRef, image.originFileObj);
        console.log(image.originFileObj);
        const photoURL = await getDownloadURL(storageRef);
        await updateProfile(auth.currentUser, {
          photoURL
        });
        this.setUser(auth.currentUser)
      } catch (e) {
        console.log(e);
        return e.code;
      } finally {
        this.loadingUser = false;
      }
    },

    async readImg() {
      try {
        // Crear la referencia en Firebase Storage
        const storageRef = ref(storage, `${this.userInfo.uid}/perfil`);

        // Obtener la URL de descarga para la imagen
        const downloadURL = await getDownloadURL(storageRef);

        // Mostramos la URL de la imagen obtenida
        console.log('URL de la imagen:', downloadURL);

        // Aquí podrías retornar la URL o usarla para actualizar la vista
        return downloadURL;
      } catch (e) {
        console.error('Error al leer la imagen:', e);
        return e.code;
      }
    },

    async updateUser(displayName) {
      this.loadingUser = true;
      try {
        await updateProfile(auth.currentUser, {
          displayName,
        });
        this.setUser(auth.currentUser);
      } catch (e) {
        console.log(e);
        return e.code;
      } finally {
        this.loadingUser = false;
      }
    },

    async setUser(user) {
      try {
        const docRef = doc(db, "users", user.uid);
        // const docSpan = await getDoc(docRef);
        this.userInfo = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        };
        await setDoc(docRef, this.userInfo);
      } catch (e) {
        console.log(e)
      }
    },

    async signOutUser() {
      this.loadingUser = true;
      try {
        router.push("/login");
        await auth.signOut();
        // this.userInfo = {};
        this.loading = true;
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
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            // await this.setUser(user);
            this.userInfo = {
              email: user.email,
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL
            };
          } else {
            this.userInfo = {};
            useDatabaseStore().$reset();
          }
          resolve(user);
        }, (error) => {
          console.error('Error en onAuthStateChanged:', error);
          reject(error);
        });

        // Dependiendo de tus necesidades, puedes o no querer desuscribirte inmediatamente.
        // Si lo haces, solo recibirás el primer cambio y luego dejarás de escuchar.
        // Si no lo haces, seguirás escuchando cambios hasta que el componente
        // sea destruido o hasta que desactives manualmente el listener.
        // unsubscribe();
      });
    },

    validation(error){
      return errorAutentication[error]
    },
    fault(error) {
      // console.log(error);
      message
          .loading('Verificando credenciales...', .5)
          .then(() => {
            if (error) {
              message.success('Imagen valida', 2.5);
            } else {
              message.error('Imagen no valida', 2.5);
            }
          });
    },

    Home() {
      router.push('/')
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
				// console.log(querySnapshot);
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
				this.documents = this.documents.filter(item => item.id !== id);
				const success = (error) => {
					message
						.loading('Verificando credenciales...', 1)
						.then(() => {
							if (error === 'ok') {
								message.success('Dato Eliminado', 2.5);
							} else {
								message.error(this.useUser.validation(error), 2.5);
							}
						});
				};
				success('ok');
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
