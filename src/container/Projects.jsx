import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaThumbsDown } from 'react-icons/fa6'
import { FaThumbsUp } from 'react-icons/fa6'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase.config'
import { toast } from 'sonner'

const Projects = () => {
  const projects = useSelector(state => state.projects?.projects)
  const searchTerm = useSelector(state => state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : "")
  const [filtered, setFiltered] = useState(projects)

  useEffect(() => {
    if (projects && projects.length > 0) {
      const filteredProjects = projects.filter(project => project.title.toLowerCase().includes(searchTerm.toLowerCase()))
      setFiltered(filteredProjects)
    }
  }, [searchTerm, projects])

  return (
    <div className='w-full h-full overflow-x-auto overflow-y-hidden p-4 items-start justify-start flex flex-col gap-4 flex-wrap'>
      {filtered && filtered.map((project, index) => (
        <ProjectCard key={index} project={project} index={index}/>
      ))}
    </div>
  )
}

const ProjectCard = ({ project, index }) => {
  const navigate = useNavigate()
  const currUser = useSelector(state => state.user?.user)

  const handleUpVote = (e) => {
    e.stopPropagation();
    if(currUser){
      if(project.likes.includes(currUser.uid)){
        const newLikes = project.likes.filter(like => like !== currUser.uid)
        const _doc = {
          ...project,
          likes: newLikes,
        }
        setDoc(doc(db, 'Projects', project.id), _doc).then((res)=> {
          toast.error(`You have unliked "${project.title}"`)
        }).catch((err)=> {
          toast.warning('Error while unliking the project')
          console.log(err)
        })
      }
      else {
        const newLikes = [...project.likes, currUser.uid]
        const newDislikes = project.dislikes.filter(dislike => dislike !== currUser.uid)
        const _doc = {
          ...project,
          likes: newLikes,
          dislikes: newDislikes,
        }
        setDoc(doc(db, 'Projects', project.id), _doc).then((res)=> {
          toast.success(`You have liked "${project.title}"`)
        }).catch((err)=> {
          toast.warning('Error while liking the project')
          console.log(err)
        })
      }
    }
  }

  const handleDownVote = (e) => {
    e.stopPropagation();
    if(currUser){
      if(project.dislikes.includes(currUser.uid)){
        const newDislikes = project.dislikes.filter(dislike => dislike !== currUser.uid)
        const _doc = {
          ...project,
          dislikes: newDislikes,
        }
        setDoc(doc(db, 'Projects', project.id), _doc).then((res)=> {
          toast.success(`You have removed dislike from "${project.title}"`)
        }).catch((err)=> {
          toast.warning('Error while removing dislike from the project',{
            description: "This action has removed your dislike from the project if you disliked it before."
          })
          console.log(err)
        })
      }
      else {
        const newDislikes = [...project.dislikes, currUser.uid]
        const newLikes = project.likes.filter(like => like !== currUser.uid)
        const _doc = {
          ...project,
          dislikes: newDislikes,
          likes: newLikes,
        }
        setDoc(doc(db, 'Projects', project.id), _doc).then((res)=> {
          toast.error(`You have disliked "${project.title}"`,{
            description: "This action has removed your like from the project if you liked it before."
          })
        }).catch((err)=> {
          toast.warning('Error while disliking the project',{})
          console.log(err)
        })
      }
    }
  }

  return (
    <div
      key={index} 
      className='h-[48%] sm:w-[360px] bg-secondary rounded-md p-3 flex flex-col items-center justify-center gap-3 cursor-pointer'
      onClick={() => navigate(`/openProject/${project.id}`)}
    >
      <div className='bg-primary w-full h-full rounded-md overflow-hidden' style={{overflow:"hidden", height:"100%"}}>
        <iframe
          srcDoc={project.output}
          title="Running"
          style={{width:"100%", height:"100%", border:"none", overflow:"hidden"}}
          className='overflow-hidden w-full h-full object-cover rounded-md'
        />
      </div>

      <div className='flex items-center justify-between gap-3 w-full'>
        <div className='flex items-center justify-start gap-3'>
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

        <div className='flex items-center justify-start gap-3'>
          <div className='flex items-center justify-start gap-1'>
            <p className={` text-xs mt-0.5 ${currUser && project.likes?.includes(currUser.uid) ? "text-emerald-700/80" : " text-white/70"}`}>{project.likes?.length || 0}</p>
            <motion.div
              className='flex items-center justify-center gap-1'
              whileHover={{scale: 1.2}}
              title={`Likes: ${project.likes?.length || 0}`}
            >
              <FaThumbsUp 
                onClick={(e)=>handleUpVote(e)} 
                className={`text-xl mb-1 ${currUser && project.likes?.includes(currUser.uid) ? "text-emerald-700/80 hover:text-emerald-700" : "hover:text-white/30 text-white/20"}`}
              />
            </motion.div>
          </div>

          <div className='flex items-center justify-start gap-1'>
            <p className={`text-xs mt-0.5 ${currUser && project.dislikes?.includes(currUser.uid) ? "text-red-700/80" : " text-white/70"} text-sm`}>{project.dislikes?.length || 0}</p>
            <motion.div
              className='flex items-center justify-center gap-1'
              whileHover={{scale: 1.2}}
              title={`Likes: ${project.dislikes?.length || 0}`}
            >
              <FaThumbsDown 
                onClick={(e)=>handleDownVote(e)} 
                className={`text-xl mt-0.5 ${currUser && project.dislikes?.includes(currUser.uid) ? "text-red-700/80 hover:text-red-700" : "hover:text-white/30 text-white/20"}`}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects