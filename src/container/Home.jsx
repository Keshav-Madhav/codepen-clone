import { useState } from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi2';
import { motion } from "framer-motion"
import { Link, Route, Routes } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import { FaSearchengin } from 'react-icons/fa6';
import { Projects, SignUp } from '../container';
import { useSelector } from 'react-redux';
import { UserProfileDetails } from '../components';

const Home = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
  const user = useSelector(state => state.user?.user)

  return (
    <>
      <div className={`${!isSideMenuOpen ? "w-2" : "flex-[.3] xl:flex-[.25] min-w-[11rem]"} min-h-screen max-h-screen relative bg-secondary flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}>
        <motion.div whileTap={{scale:.8}} onClick={()=> setIsSideMenuOpen(!isSideMenuOpen)} className='w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer'>
          {!isSideMenuOpen ? (
            <HiChevronDoubleRight className='text-white text-xl'/>
          ):(
            <HiChevronDoubleLeft className='text-white text-xl'/>
          )}
        </motion.div>

        {isSideMenuOpen && (
          <div className='absolute w-full h-full flex flex-col gap-4 justify-between px-3 py-6 '>
            <div className=' flex flex-col gap-8'>
              <Link to='/home' className='w-full flex items-center'>
                <img src='/logo.png' alt='logo' className='object-contain w-72 h-auto'/>
              </Link>

              <Link to={"/newProject"}>
                <div className='px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200'>
                  <p className='text-gray-400 group-hover:text-gray-200 capitalize'>Start Coding</p>
                </div>
              </Link>
            </div>

            {user && (
              <Link to={"/home/projects"} className='flex items-center justify-center gap-6 hover:bg-[#131417] py-3 px-6 rounded-xl transition-all duration-200 ease-in-out'>
                <MdHome className='text-primaryText text-xl'/>
                <p className='text-lg text-primaryText'>Home</p>
              </Link>
            )}
          </div>  
          )}
      </div>

      <div className='flex-1 min-h-screen max-h-screen h-full overflow-y-auto overflow-x-hidden flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12'>
        <div className='w-full flex items-center justify-between gap-3'>
        <div className='bg-secondary w-full flex items-center justify-center gap-2 px-4 py-1.5 rounded-md'>
            <FaSearchengin className='text-primaryText text-2xl'/>
            <input 
              type="text" 
              placeholder='Search...' 
              className='flex-1 px-4 py-1 text-md bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600'
            />
          </div>

          {user ? (
            <UserProfileDetails user={user}/>
          ):(
            <motion.div whileTap={{scale:.9}} className='flex items-center justify-center gap-3'>
              <Link to="/home/auth" className='bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700'>
                SignUp
              </Link>
            </motion.div>
          )}
        </div>

        <div className='w-full'>
          <Routes>
            <Route path='/*' element={<Projects/>}/>
            <Route path='/auth' element={<SignUp/>}/>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default Home