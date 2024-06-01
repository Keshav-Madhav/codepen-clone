import { GithubAuthProvider, GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import { auth } from "../config/firebase.config"
import { v4 as uuidv4 } from 'uuid'

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

export const SignInWithGoogle = async () => {
  await signInWithRedirect(auth, googleProvider).then((userCred) => {
    window.location.reload()
  })
}

export const SignInWithGithub = async () => {
  await signInWithRedirect(auth, githubProvider).then((userCred) => {
    window.location.reload()
  })
}

export const Menus = [
  {id: uuidv4(), title: 'Projects', uri:"/home/projects"},
  {id: uuidv4(), title: 'Profile', uri:"/home/profile"},
  {id: uuidv4(), title: 'Collections', uri:"/home/collection"},
]

export const signOutUser = async () => {
  await auth.signOut().then(() => {
    window.location.reload()
  })
}