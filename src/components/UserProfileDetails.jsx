import {useState} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa6'
import { Menus, signOutUser } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { slideUp } from '../animation'

const UserProfileDetails = ({user}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className='flex items-center justify-center gap-4 relative'>
      <div className='w-11 h-11 flex items-center justify-center rounded-lg overflow-hidden cursor-pointer bg-emerald-500'>
        {user.photoURL !== null ? (
          <motion.img whileHover={{scale: 1.2}} src={user.photoURL} alt={user.displayName} className='object-cover w-full h-full' referrerPolicy='no-policy'/>
        ):(
          <p className='text-white text-xl font-semibold capitalize'>{(user.displayName || user.email).charAt(0)}</p>
        )}
      </div>   

      <motion.div onClick={()=> setIsMenuOpen(!isMenuOpen)} whileTap={{scale: 0.9}} className='px-3 py-3 rounded-md flex items-center justify-center bg-secondary cursor-pointer'>
        <FaChevronDown className='text-primaryText'/>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div {...slideUp} className='bg-secondary absolute top-16 right-0 px-2 py-2 rounded-xl shadowm-md z-10 flex flex-col items-start justify-start gap-1 min-w-[225px]'>
            {Menus.map(menu => (
              <Link key={menu.id} to={menu.uri} className='text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md'>
                <p>{menu.title}</p>
              </Link>
            ))}
            <motion.p onClick={signOutUser} whileTap={{scale:0.9}} className='text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md cursor-pointer'>
              Sign Out
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default UserProfileDetails