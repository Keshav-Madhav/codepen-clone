import { useEffect, useState } from 'react'
import SplitPane from 'react-split-pane'
import "../index.css"
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from 'react-icons/fa6'
import { FcSettings } from 'react-icons/fc'
import CodeMirror, {EditorView, EditorSelection} from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { AnimatePresence, motion } from 'framer-motion'
import { MdCheck, MdEdit } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { UserProfileDetails } from '../components'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase.config'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const OpenProject = () => {
  const { id } = useParams()
  const projects = useSelector(state => state.projects?.projects)
  const currUSer = useSelector(state => state.user?.user)
  const [html, setHtml] = useState('<body>\n  <h1 class="hello">\n    Hello\n  </h1>\n</body>')
  const [css, setCss] = useState('body{\n  background-color: #181818\n} \n\n.hello{\n  color: #ffffff\n}')
  const [js, setJs] = useState('setTimeout(() => {\n  document.querySelector(".hello").style.color = "red"\n}, 2000) \n\nsetTimeout(() => {\n  document.querySelector(".hello").style.color = "green"\n}, 4000)')
  const [output, setOutput] = useState('')
  const [isEditable, setIsEditable] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('Untitled')
  const [project, setProject] = useState(null)

  const runCode = () => {
    const combinedCode = `
      <html>
        <head>
          <style> ${css} </style>
        </head>
        ${html}
        <script> ${js} </script>
      </html>
    `;

    setOutput(combinedCode)
  }

  useEffect(() => {
    runCode()
  }, [html, css, js])

  useEffect(() => {
    if (projects && projects.length > 0) {
      const project = projects.find(project => project.id === id)
      if (project) {
        setTitle(project.title)
        setHtml(project.html)
        setCss(project.css)
        setJs(project.js)
        setOutput(project.output)
        setProject(project)
        setIsEditable(currUSer?.uid === project.user?.uid)
        console.log(project)
      }
    }
  }, [projects, id, currUSer]) 

  const saveCode = async() => {
    if(project){
      const _doc = {
        id: project.id,
        title: title,
        html: html,
        css: css,
        js: js,
        output: output,
        user: project.user,
        likes: project.likes,
        dislikes: project.dislikes,
      }
  
      await setDoc(doc(db, 'Projects', project.id), _doc).then((res)=> {
        toast.success('Project Updated Successfully')
      }).catch((err)=> {
        console.log(err)
      })
    }
  }

  return (
    <>
      <div className='w-screen h-screen flex flex-col items-start justify-start overflow-hidden'>
        <div className='h-[8%] w-full flex items-center justify-between px-12 py-4'>
          <div className='flex items-center justify-center gap-4'>
            <Link to='/home/projects'> 
              <img src='/logo.png' alt='logo' className='object-contain w-24 h-auto'/>
            </Link>

            <div className='flex items-start justify-start flex-col'>
              <div className='flex items-center justify-start gap-2'>
                <AnimatePresence>
                  {isEditable && isEditing ? (
                    <motion.input 
                      key='input'
                      type="text" 
                      placeholder='Untitled Project'
                      className='max-w-fit px-2 py-1 rounded-md bg-transparent text-primaryText text-sm outline-none focus:bg-secondary'
                      value={title}
                      onChange={(e)=> setTitle(e.target.value)}
                    />
                  ):(
                    <motion.p key="titleLabel" className='px-2 py1 text-white text-sm'>{title}</motion.p>
                  )}
                </AnimatePresence>

                {isEditable && (
                  <AnimatePresence>
                    {isEditing ? (
                      <motion.div key="MdCheck" whileTap={{scale: 0.9}} className='cursor-pointer' onClick={()=> setIsEditing(false)}>
                        <MdCheck className='text-emerald-500 text-md'/>
                      </motion.div>
                    ):(
                      <motion.div key="MdEdit" whileTap={{scale: 0.9}} className='cursor-pointer' onClick={()=> setIsEditing(true)}>
                        <MdEdit className='text-primaryText text-md'/>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>

              <div className='flex items-center justify-start gap-2 px-2'>
                <p className='text-primaryText text-xs'>
                  {project?.user?.displayName || project?.user?.email.split('@')[0] || "Guest"}
                </p>
                <motion.p whileTap={{scale:0.9}} className='text-[10px] bg-emerald-500 rounded-sm px-1 pt-[1px] text-primary font-medium cursor-pointer'>
                  + Follow
                </motion.p>
              </div>
            </div>
          </div>

          {project?.user && (
              <div className='flex items-center justify-center gap-3'>
                {isEditable && (
                  <motion.button onClick={saveCode} whileTap={{scale:0.9}} className='px-3 py-1.5 bg-primaryText cursor-pointer text-sm text-primary font-medium rounded-lg'>
                    Save
                  </motion.button>
                )}

                <UserProfileDetails user={currUSer}/>
              </div>
            )}
        </div>

        <div className='h-[92%] relative'>
          <SplitPane split="horizontal" minSize="10%" maxSize="80%" initialSize="40%" className='w-screen height-[90%]'>
            <SplitPane initialSize="20%" minSize="150" maxSize="80%" className='border-b border-white/50'>
              <div minSize="200" maxSize="60%" className='w-full h-full flex flex-col items-start justify-start border-r border-white/50'>
                <div className='w-full flex items-center justify-between'>
                  <div className='bg-secondary px-4 py-2 border-t-4 border-t-gray-500 flex items-center justify-center gap-2'>
                    <FaHtml5 className="text-xl text-red-500"/>
                    <p className='text-primaryText font-semibold'>HTML</p>
                  </div>
                  
                  <div className='cursor-pointer flex items-center justify-center gap-4 px-4'>
                    <FcSettings className='text-xl'/>
                    <FaChevronDown className='text-xl text-primaryText'/>
                  </div>
                </div>
                <div className='h-full w-full px-2'>
                  <CodeMirror
                    value={html}
                    height='100%'
                    maxHeight='100%'
                    style={{height:"100%", maxHeight:"95%"}}
                    extensions={[javascript({jsx:true}), EditorView.lineWrapping]}
                    onChange={(value, viewUpdate)=> setHtml(value)}
                    theme={"dark"}
                    selection={EditorSelection.cursor(0, 0)}
                    readOnly={!isEditable}
                  />
                </div>
              </div>

              <div minSize="200" maxSize="60%" className='w-full h-full flex flex-col items-start justify-start'>
                <div className='w-full flex items-center justify-between'>
                  <div className='bg-secondary px-4 py-2 border-t-4 border-t-gray-500 flex items-center justify-center gap-2'>
                    <FaCss3 className="text-xl text-sky-500"/>
                    <p className='text-primaryText font-semibold'>CSS</p>
                  </div>
                  
                  <div className='cursor-pointer flex items-center justify-center gap-4 px-4'>
                    <FcSettings className='text-xl'/>
                    <FaChevronDown className='text-xl text-primaryText'/>
                  </div>
                </div>
                <div className='h-full w-full px-2'>
                  <CodeMirror
                    value={css}
                    height='100%'
                    maxHeight='100%'
                    style={{height:"100%", maxHeight:"95%"}}
                    extensions={[javascript({jsx:true}), EditorView.lineWrapping]}
                    onChange={(value, viewUpdate)=> setCss(value)}
                    theme={"dark"}
                    readOnly={!isEditable}
                  />
                </div>
              </div>

              <div minSize="200" maxSize="60%" className='w-full h-full flex flex-col items-start justify-start border-l border-white/50'>
                <div className='w-full flex items-center justify-between'>
                  <div className='bg-secondary px-4 py-2 border-t-4 border-t-gray-500 flex items-center justify-center gap-2'>
                    <FaJs className="text-xl text-yellow-500"/>
                    <p className='text-primaryText font-semibold'>JS</p>
                  </div>
                  
                  <div className='cursor-pointer flex items-center justify-center gap-4 px-4'>
                    <FcSettings className='text-xl'/>
                    <FaChevronDown className='text-xl text-primaryText'/>
                  </div>
                </div>
                <div className='h-full w-full px-2'>
                  <CodeMirror
                    value={js}
                    height='100%'
                    maxHeight='100%'
                    style={{height:"100%", maxHeight:"95%"}}
                    extensions={[javascript({jsx:true}), EditorView.lineWrapping]}
                    onChange={(value, viewUpdate)=> setJs(value)}
                    theme={"dark"}
                    readOnly={!isEditable}
                  />
                </div>
              </div>
            </SplitPane>

            <div className='' style={{overflow:"hidden", height:"100%"}}>
              <iframe
                srcDoc={output}
                title="Running"
                style={{width:"100%", height:"100%", border:"none"}}
              />
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  )
}

export default OpenProject