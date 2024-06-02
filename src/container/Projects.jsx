import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Projects = () => {
  const projects = useSelector(state => state.projects?.projects)
  const searchTerm = useSelector(state => state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : "")
  const [filtered, setFiltered] = useState(projects)

  useEffect(() => {
    if (projects && projects.length > 0) {
      const filteredProjects = projects.filter(project => project.title.toLowerCase().includes(searchTerm.toLowerCase()))
      setFiltered(filteredProjects)
    }
  }, [searchTerm])

  return (
    <div className='w-full py-6 flex items-center justify-center gap-4 flex-wrap'>
      {filtered && filtered.map((project, index) => (
        <ProjectCard key={index} project={project} index={index}/>
      ))}
    </div>
  )
}

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div key={index} className='w-full cursor-pointer sm:w-[330px] h-[290px] bg-secondary rounded-md p-3 flex flex-col items-center justify-center gap-3'>
      <div className='bg-primary w-full h-full rounded-md overflow-hidden' style={{overflow:"hidden", height:"100%"}}>
        <iframe
          srcDoc={project.output}
          title="Running"
          style={{width:"100%", height:"100%", border:"none"}}
        />
      </div>

      <div className='flex items-center justify-start gap-3 w-full'>
        <div className='w-11 h-11 flex items-center justify-center rounded-lg overflow-hidden cursor-pointer bg-emerald-500'>
          {project?.user?.photoURL ? (
            <motion.img whileHover={{scale: 1.2}} src={project.user.photoURL} alt={project.user.displayName} className='object-cover w-full h-full' referrerPolicy='no-policy'/>
          ):(
            <p className='text-white text-xl font-semibold capitalize'>{(project?.user?.displayName || project?.user?.email).charAt(0)}</p>
          )}
        </div>

        <div>
          <p className='text-white text-md capitalize'>{project?.title}</p>
          <p className='text-primaryText text-sm capitalize'>
            {project?.user?.displayName || project?.user?.email.split('@')[0] || "Guest"}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default Projects