import {useState} from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { motion } from 'framer-motion';

const UserAuthInput = ({label, placeholder, isPass, setState, Icon, setEmailStatus}) => {
  const [value, setValue] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [ isEmailValid, setEmailValid ] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value)
    setState(e.target.value)

    if(placeholder === 'Email') {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      setEmailValid(emailRegex.test(e.target.value));
      setEmailStatus(emailRegex.test(e.target.value));
    }
  }

  return (
    <div className='flex flex-col items-start justify-start gap-1'>
      <label className='text-sm text-gray-300'>
        {label}
      </label>

      <div className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200 ${!isEmailValid && placeholder === "Email" && value.length > 0 && "outline outline-red-500"}`}>
        <Icon className='text-text555 text-2xl'/>
        <input 
          type={showPass && isPass ? 'password' : 'text'}
          placeholder={placeholder}
          className='flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text-555 text-lg'
          value={value}
          onChange={handleChange}
        />

        {isPass && (
          <motion.div onClick={()=>setShowPass(!showPass)} whileTap={{scale:0.9}} className="cursor-poniter">
            {showPass ? (
              <FaEye className='text-text555 text-2xl'/>
            ):(
              <FaEyeSlash className='text-text555 text-2xl'/>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default UserAuthInput