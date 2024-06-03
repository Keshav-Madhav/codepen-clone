import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Home, NewProject } from './container'
import { auth, db } from './config/firebase.config'
import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { Spinner } from './components'
import { useDispatch } from 'react-redux'
import { SET_USER } from './context/actions/userActions'
import { SET_PROJECTS } from './context/actions/projectActions'
import OpenProject from './container/OpenProject'

const App = () => {
  const navigate = useNavigate()
  const [isloading, setIsLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.providerData[0])
        setDoc(doc(db, "users", user.uid), user.providerData[0]).then(() => {
          dispatch(SET_USER(user.providerData[0]))
          // navigate("/home/projects", {replace: true})
        }).catch((error) => {
          console.error("Error adding document: ", error)
        })
      } else {
        navigate("/home/auth", {replace: true})
      }
      setInterval(()=>{
        setIsLoading(false)
      }, 2000)
    })

    return () => unsubscribe();
  }, [dispatch, navigate]);

  useEffect(() => {
    const projectQuery = query(
      collection(db, "Projects"),
      orderBy("id", "desc")
    )

    const unsubscribe = onSnapshot(projectQuery, (querySnapshot => {
      const projectsList = querySnapshot.docs.map((doc) => doc.data())
      dispatch(SET_PROJECTS(projectsList))
    }))

    return () => unsubscribe()
  }, [dispatch])

  return (
    <>
      {isloading ? (
        <div className='w-screen h-screen flex items-center justify-center overflow-hidden'>
          <Spinner />
        </div>
      ):(
        <div className='w-screen h-screen flex items-start justify-start overflow-hidden'>
          <Routes>
            <Route path='/home/*' element={<Home />} />

            <Route path='/newProject' element={<NewProject/>} />

            <Route path='/openProject/*' element={<OpenProject/>} />
    
            <Route path='*' element={<Navigate to={"/home"}/>} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App