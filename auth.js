import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from 'firebase/auth'

const authForm = document.querySelector('.auth-form')

export const handleAuth = (app) => {
  const auth = getAuth(app)
  handleLogin(auth)
  handleSignUp(auth)


  onAuthStateChanged(auth, (user) => {
    console.log('user', user)
    const usersec = document.getElementById('user');
    if(user) {
      const userEmail = user.email;
      if(userEmail) {
        usersec.innerHTML = `
          <p>Hello <span class='bold'>${userEmail}</span></p>
          <button class="logout">logout</button>
        `
      }
      document.querySelector('#auth').style.display = 'none';
    }else {
      usersec.innerHTML = '';
      document.querySelector('#auth').style.display = 'block'
    }
    handleLogout(auth)
  })
}

const handleLogin = (auth) => {
  const loginBtn = document.querySelector('.auth-login')
  loginBtn.addEventListener('click', async (e) => {
    const email = authForm.email.value;
    const password = authForm.password.value;
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password)
      console.log(credentials)
      authForm.reset()
      location.reload()
      loader.style.display = 'none';
    } catch (error) {
      console.log(error)
    }
  })
}

const handleSignUp = (auth) => {
  const loginBtn = document.querySelector('.auth-signup')
  loginBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    console.log('SIGNUP', authForm.email.value, authForm.password.value)
    const email = authForm.email.value;
    const password = authForm.password.value;
    const displayName = authForm.displayName.value;
    try {
      const credentials = await createUserWithEmailAndPassword(auth, email, password)
      // await updateProfile(credentials.user, { displayName });
      console.log('credentials', credentials)
      authForm.reset()
    } catch (error) {
      if(error) {
        alert('invalid credentials')
      }
      console.log(error)
    }
  })
}

const handleLogout = (auth) => {
  const logoutBtn = document.querySelector('.logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      console.log('LOGOUT')
      signOut(auth)
      location.reload()
    })
  }
}