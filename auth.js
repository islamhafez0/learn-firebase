import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'



const authForm = document.querySelector('.auth-form')

export const handleAuth = (app) => {

  const auth = getAuth(app)

  handleLogin(auth)
  handleSignUp(auth)


  onAuthStateChanged(auth, (user) => {
    console.log('USER', user)

    const userSec = document.querySelector('#user')
    if (user) {
      userSec.innerHTML = `
          <p> Hello ${user.email}</p>
          <button class="logout"> logout </button>
        
        `
    } else {
      userSec.innerHTML = ''
    }
    handleLogout(auth)
  })


}

const handleLogin = (auth) => {
  const loginBtn = document.querySelector('.auth-login')
  loginBtn.addEventListener('click', async (e) => {
    console.log('LOGIN', authForm.email.value, authForm.password.value)

    try {
      const credintials = await signInWithEmailAndPassword(auth, authForm.email.value, authForm.password.value)
      console.log('credintials', credintials)
      authForm.reset()
      location.reload()
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

    try {
      const credintials = await createUserWithEmailAndPassword(auth, authForm.email.value, authForm.password.value)
      console.log('credintials', credintials)
      authForm.reset()
    } catch (error) {
      console.log(error)
    }

  })
}

const handleLogout = (auth) => {
  const logoutBtn = document.querySelector('.logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      console.log('LOGOUT',)

      try {
        await signOut(auth)
        console.log('User logout')
        location.reload()
      } catch (error) {
        console.log(error.message)
      }
    })
  }
}