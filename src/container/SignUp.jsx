import {useState} from 'react'
import { UserAuthInput } from '../components'
import { FaEnvelope, FaGithub } from 'react-icons/fa6';
import { MdPassword } from 'react-icons/md';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setEmailValid] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className='w-full py-6'>
      <img src='/logo.png' alt='logo' className='object-contain w-32 h-auto opacity-50'/>

      <div className='w-full flex flex-col items-center justify-center py-8'>
        <p className='py-12 text-2xl text-primaryText'>Join With Us!</p>

        <div className='px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8'>
          <UserAuthInput label="Email" placeholder="Email" key="Email" setState={setEmail} Icon={FaEnvelope} setEmailStatus={setEmailValid}/>

          <UserAuthInput label="Password" placeholder="Password" isPass key="Password" setState={setPassword} Icon={MdPassword}/>

          <motion.div whileTap={{scale:.9}} className='w-full flex items-center justify-center bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700'>
            <p className='text-xl text-white'>{isLogin ? 'Log In' : 'Sign Up'}</p>
          </motion.div>

          <p className='text-sm text-primaryText flex items-center justify-center gap-3'>
            {isLogin ? 'Don\'t have an account?' : 'Already Have an account?'}
            <span  onClick={()=>setIsLogin(!isLogin)} className='text-emerald-500 cursor-pointer underline'>{isLogin ? "Sign Up" : "Create account"}</span>
          </p>

          <div className='w-full flex items-center justify-between gap-3'>
            <hr className='w-full h-[1px] border-none outline-none bg-[rgba(256,256,256,0.2)] rounded-md'/>

            <p className='text-sm text-[rgba(256,256,256,0.21)]'>OR</p>

            <hr className='w-full h-[1px] border-none outline-none bg-[rgba(256,256,256,0.2)] rounded-md'/>
          </div>

          <motion.div whileTap={{scale:0.9}} className='w-full flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.1)] cursor-pointer backdrop-blur-md py-3 rounded-xl hover:bg-[rgba(256,256,256,0.2)]'>
            <FcGoogle className='text-3xl '/>
            <p className='text-lg text-white'>Sign in with Google</p>
          </motion.div>

          <motion.div whileTap={{scale:0.9}} className='w-full flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.1)] cursor-pointer backdrop-blur-md py-3 rounded-xl hover:bg-[rgba(256,256,256,0.2)]'>
            <FaGithub className='text-3xl '/>
            <p className='text-lg text-white'>Sign in with Github</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SignUp