import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from './container'
import { auth, db } from './config/firebase.config'
import { doc, setDoc } from 'firebase/firestore'
import { Spinner } from './components'

const App = () => {
  const navigate = useNavigate()
  const [isloading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.providerData[0])
        setDoc(doc(db, "users", user.uid), user.providerData[0]).then(() => {
          //
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
  }, [])

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
    
            <Route path='*' element={<Navigate to={"/home"}/>} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App