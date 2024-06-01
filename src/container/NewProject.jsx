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
import { Alert } from '../components'

const NewProject = () => {
  const [html, setHtml] = useState('<body>\n  <h1 class="hello">\n    Hello\n  </h1>\n</body>')
  const [css, setCss] = useState('body{\n  background-color: #181818\n} \n\n.hello{\n  color: #ffffff\n}')
  const [js, setJs] = useState('setTimeout(() => {\n  document.querySelector(".hello").style.color = "red"\n}, 2000) \n\nsetTimeout(() => {\n  document.querySelector(".hello").style.color = "green"\n}, 4000)')
  const [output, setOutput] = useState('')
  const [isTitleEditable, setIsTitleEditable] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('Untitled')
  const [ alert , setAlert ] = useState(false)

  const user = useSelector(state => state.user?.user)

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

  const saveCode = async() => {
    const id = `${Date.now()}${Math.floor(Math.random() * 1000)}`
    const _doc = {
      id: id,
      title: title,
      html: html,
      css: css,
      js: js,
      output: output,
      user: user
    }

    await setDoc(doc(db, 'Projects', id), _doc).then((res)=> {
      setAlert(true)
      setInterval(()=> {
        setAlert(false)
      }, 3000)
    }).catch((err)=> {
      console.log(err)
    })
  }

  return (
    <>
      <div className='w-screen h-screen flex flex-col items-start justify-start overflow-hidden'>
        <AnimatePresence>
          {alert && (
            <Alert status="success" alertMsg="Project Saved Successfully!" />
          )}
        </AnimatePresence>

        <div className='h-[8%] w-full flex items-center justify-between px-12 py-4'>
          <div className='flex items-center justify-center gap-4'>
            <img src='/logo.png' alt='logo' className='object-contain w-24 h-auto'/>

            <div className='flex items-start justify-start flex-col'>
              <div className='flex items-center justify-start gap-2'>
                <AnimatePresence>
                  {isTitleEditable && isEditing ? (
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

                {isTitleEditable && (
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
                  {user?.displayName || user?.email.split('@')[0] || "Guest"}
                </p>
                <motion.p whileTap={{scale:0.9}} className='text-[10px] bg-emerald-500 rounded-sm px-1 pt-[1px] text-primary font-medium cursor-pointer'>
                  + Follow
                </motion.p>
              </div>
            </div>
          </div>

          {user && (
              <div className='flex items-center justify-center gap-3'>
                <motion.button onClick={saveCode} whileTap={{scale:0.9}} className='px-3 py-1.5 bg-primaryText cursor-pointer text-sm text-primary font-medium rounded-lg'>
                  Save
                </motion.button>

                <UserProfileDetails user={user}/>
              </div>
            )}
        </div>

        <div className='h-[92%] relative'>
          <SplitPane split="horizontal" minSize="10%" maxSize="80%" initialSize="40%" className='w-screen height-[90%]'>
            <SplitPane initialSize="50%" minSize="200" maxSize="80%" className='border-b border-white/50'>
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

export default NewProject