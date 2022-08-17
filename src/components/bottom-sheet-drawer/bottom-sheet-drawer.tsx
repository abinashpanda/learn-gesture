import { createPortal } from 'react-dom'
import { useSpring, animated, config } from '@react-spring/web'
import { HiArrowCircleUp } from 'react-icons/hi'
import { useState } from 'react'

const PORTAL_CONTAINER = document.getElementById('bottom-drawer-root')!

type BottomSheetDrawer = {
  initialHeight?: number
  finalHeight?: number
  children: React.ReactNode
}

export default function BottomSheetDrawer({
  initialHeight = 96,
  finalHeight = window.innerHeight,
  children,
}: BottomSheetDrawer) {
  const [opened, setOpened] = useState(false)
  const [{ height }] = useSpring(
    { height: opened ? finalHeight : initialHeight, config: opened ? config.gentle : config.wobbly },
    [opened],
  )

  return createPortal(
    <>
      <animated.div
        className="bg-black bg-opacity-80 fixed inset-0 pointer-events-none"
        style={{
          opacity: height.to([initialHeight, finalHeight], [0, 1], 'clamp'),
        }}
      />
      <animated.div
        className="fixed bottom-0 left-0 right-0 rounded-t-md border border-b-0 touch-none overflow-hidden flex flex-col bg-white"
        style={{ height }}
      >
        <button
          className="flex items-center justify-center my-1 text-slate-500 p-2"
          onClick={() => {
            setOpened((prevState) => !prevState)
          }}
        >
          <animated.div
            style={{
              transform: height.to([initialHeight, finalHeight], ['rotate(0deg)', 'rotate(180deg)'], 'clamp'),
            }}
          >
            <HiArrowCircleUp size={24} />
          </animated.div>
        </button>
        <animated.div
          className="pb-4 px-4 flex-1 touch-auto"
          style={{
            overflowY: height.to((v) => {
              if (v >= finalHeight * 0.9) {
                return 'auto'
              }
              return 'hidden'
            }),
          }}
        >
          {children}
        </animated.div>
      </animated.div>
    </>,
    PORTAL_CONTAINER,
  )
}
