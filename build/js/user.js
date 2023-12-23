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