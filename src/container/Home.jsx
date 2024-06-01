import {useState} from 'react'

const Home = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <>
      <div className={`${isSideMenuOpen ? "w-2" : "flex-[.2] xl:flex-[.3]"} min-h-screen max-h-screen relative bg-secondary`}>

      </div>

      <div>

      </div>
    </>
  )
}

export default Home