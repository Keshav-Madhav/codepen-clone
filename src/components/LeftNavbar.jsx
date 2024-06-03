import { useState } from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi2';
import { MdHome } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LeftNavbar = ({user}) => {
  const projects = useSelector(state => state.projects?.projects)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true)

  return (
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

          {user && projects && (
            <div className='h-full overflow-y-auto w-full flex flex-col gap-3 pt-4 mt-2'>
              <p className='text-white text-lg'>My Projects</p>
              {projects.filter(project => project.user.email === user.email).map((project, index) => (
                <Link to={`/project/${project.id}`}>
                  <div key={index} className='min-h-10 flex items-center justify-center border border-gray-400 rounded-md hover:border-gray-200'>
                    <p className='text-gray-400 text-sm capitalize truncate'>{project.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {user && (
            <Link to={"/home/projects"} className='flex items-center justify-center gap-6 hover:bg-[#131417] py-3 px-6 rounded-xl transition-all duration-200 ease-in-out'>
              <MdHome className='text-primaryText text-xl'/>
              <p className='text-lg text-primaryText'>Home</p>
            </Link>
          )}
        </div>  
        )}
    </div>
  )
}

export default LeftNavbar