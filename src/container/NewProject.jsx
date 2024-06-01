import React from 'react'
import SplitPane from 'react-split-pane'
import "../index.css"
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from 'react-icons/fa6'
import { FcSettings } from 'react-icons/fc'

const NewProject = () => {
  return (
    <>
      <div className='w-screen h-screen flex flex-col items-start justify-start overflow-hidden'>

        <div className='h-full'>
          <SplitPane split="horizontal" minSize="10%" maxSize="80%" initialSize="50%" className='w-screen h-auto'>
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
                <div>

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
                <div>

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
                <div>

                </div>
              </div>
            </SplitPane>

            <div>

            </div>
          </SplitPane>
        </div>
      </div>
    </>
  )
}

export default NewProject