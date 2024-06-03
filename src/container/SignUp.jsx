import {useEffect, useState} from 'react'
import { UserAuthInput } from '../components'
import { FaEnvelope, FaGithub } from 'react-icons/fa6';
import { MdPassword } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { SignInWithGithub, SignInWithGoogle } from '../utils/helpers';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { fadeInOut } from '../animation';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setEmailValid] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const user = useSelector(state => state.user?.user)
  const navigate = useNavigate()

  const createNewUser = async () => {
    if(isEmailValid){
      await createUserWithEmailAndPassword(auth, email, password).then((userCred) => {
        if(userCred){
          navigate("/home/projects", {replace: true})
          setAlert(false)
        }
      }).catch((error) => {
        if(error.message.includes("email-already-in-use")){
          setAlert(true)
          setAlertMessage('Email Already in use: Email ID already exists')
        }else if(error.message.includes("weak-password")){
          setAlert(true)
          setAlertMessage('Weak Password: Password should be at least 6 characters long')
        } else {
          setAlert(true)
          setAlertMessage('Invalid Email ID: Please enter a valid email ID')
        }

        setInterval(() => {
          setAlert(false)
        }
        , 5000)
      })
    }
  }

  const loginWithEmailPassword = async () => {
    if(isEmailValid){
      await signInWithEmailAndPassword(auth, email, password).then((userCred) => {
        if(userCred){
          navigate("/home/projects", {replace: true})
          setAlert(false)
        }
      }).catch((error) => {
        console.log(error.message)
        if(error.message.includes("user-not-found")){
          setAlert(true)
          setAlertMessage('Invalid Email ID: User not found')
        }else if(error.message.includes("wrong-password")){
          setAlert(true)
          setAlertMessage('Incorrect Password: Password incorrect for email ID')
        } else {
          setAlert(true)
          setAlertMessage('Error: Something went wrong, please try again later')
        }

        setInterval(() => {
          setAlert(false)
        }
        , 5000)
      })
    }
  }

  useEffect(() => {
    if(user){
      navigate("/home/projects", {replace: true})
    }
  }
  , [user, navigate]);

  return (
    <div className='w-full py-6'>
      <img src='/logo.png' alt='logo' className='object-contain w-32 h-auto opacity-50'/>

      <div className='w-full flex flex-col items-center justify-center py-8'>
        <div className='px-8 mt-6 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-3'>
          <UserAuthInput label="Email" placeholder="Email" key="Email" setState={setEmail} Icon={FaEnvelope} setEmailStatus={setEmailValid}/>

          <UserAuthInput label="Password" placeholder="Password" isPass key="Password" setState={setPassword} Icon={MdPassword}/>

          <AnimatePresence>
            {alert && (
              <motion.p  
                key="alertMessage"
                {...fadeInOut}
                className='text-red-500'
              >
                {alertMessage}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.div 
            whileTap={{scale:.9}} 
            className='w-full my-2 flex items-center justify-center bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700'
            onClick={()=>{
              if(isLogin){
                loginWithEmailPassword()
              }else{
                createNewUser()
              }
            }}
          >
            <p className='text-xl text-white'>{isLogin ? 'Log In' : 'Sign Up'}</p>
          </motion.div>

          <p className='text-sm text-primaryText flex items-center justify-center gap-3'>
            {isLogin ? 'Don\'t have an account?' : 'Already Have an account?'}
            <span  onClick={()=>setIsLogin(!isLogin)} className='text-emerald-500 cursor-pointer underline'>{isLogin ? "Create account" : "Log In"}</span>
          </p>

          <div className='w-full flex items-center justify-between gap-3'>
            <hr className='w-full h-[1px] border-none outline-none bg-[rgba(256,256,256,0.2)] rounded-md'/>

            <p className='text-sm text-[rgba(256,256,256,0.21)]'>OR</p>

            <hr className='w-full h-[1px] border-none outline-none bg-[rgba(256,256,256,0.2)] rounded-md'/>
          </div>

          <motion.div onClick={SignInWithGoogle} whileTap={{scale:0.9}} className='w-full flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.1)] cursor-pointer backdrop-blur-md py-3 rounded-xl hover:bg-[rgba(256,256,256,0.2)]'>
            <FcGoogle className='text-3xl '/>
            <p className='text-lg text-white'>Sign in with Google</p>
          </motion.div>

          <motion.div onClick={SignInWithGithub} whileTap={{scale:0.9}} className='w-full flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.1)] cursor-pointer backdrop-blur-md py-3 rounded-xl hover:bg-[rgba(256,256,256,0.2)]'>
            <FaGithub className='text-3xl '/>
            <p className='text-lg text-white'>Sign in with Github</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SignUp