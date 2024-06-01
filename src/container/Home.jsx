import {useState} from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi2';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import { MdHome } from 'react-icons/md';

const Home = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
  const [user, setUser] = useState("null");

  return (
    <>
      <div className={`${!isSideMenuOpen ? "w-2" : "flex-[.2] xl:flex-[.25]"} min-h-screen max-h-screen relative bg-secondary flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}>
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

      <div>

      </div>
    </>
  )
}

export default Home