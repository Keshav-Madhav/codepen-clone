import { GithubAuthProvider, GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import { auth } from "../config/firebase.config"

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