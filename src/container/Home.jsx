import { motion } from "framer-motion"
import { Link, Route, Routes } from 'react-router-dom';
import { FaSearchengin } from 'react-icons/fa6';
import { Projects, SignUp } from '../container';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileDetails } from '../components';
import { SET_SEARCH_TERM } from '../context/actions/searchActions';
import LeftNavbar from '../components/LeftNavbar';

const Home = () => {
  const user = useSelector(state => state.user?.user)
  const searchTerm = useSelector(state => state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : "")
  const dispatch = useDispatch();

  return (
    <>
      <LeftNavbar user={user}/>

      <div className='flex-1 min-h-screen max-h-screen h-full overflow-y-hidden overflow-x-hidden flex flex-col gap-4 items-start justify-start px-3 md:px-6 py-3 md:py-6'>
        <div className='w-full flex items-center justify-between gap-3'>
          <div className='bg-secondary w-full flex items-center justify-center gap-2 px-4 py-1.5 rounded-md'>
            <FaSearchengin className='text-primaryText text-2xl'/>
            <input 
              type="text" 
              placeholder='Search...' 
              className='flex-1 px-4 py-1 text-md bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600'
              value={searchTerm}
              onChange={(e) => dispatch(SET_SEARCH_TERM(e.target.value))}
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

        <Routes>
          <Route path='/*' element={<Projects/>}/>
          <Route path='/auth' element={<SignUp/>}/>
        </Routes>
      </div>
    </>
  )
}

export default Home