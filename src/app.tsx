import { clamp, range } from 'lodash'
import BottomSheetDrawer from 'components/bottom-sheet-drawer'
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import DraggableList from 'components/draggable-list'
import { useMemo } from 'react'
import clsx from 'clsx'
import { HiArrowLeft } from 'react-icons/hi'
import SwipableCards from 'components/swipable-cards'

export default function App() {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route
        path=""
        element={
          <div className="space-y-2 p-4">
            <Link to="/components/bottom-sheet" className="block">
              Bottom Sheet
            </Link>
            <Link to="/components/draggable-list" className="block">
              Draggable List
            </Link>
            <Link to="/components/swipable-cards" className="block">
              Swipable Cards
            </Link>
          </div>
        }
      />
      <Route
        path="components"
        element={
          <div>
            <div className="fixed top-0 left-0 right-0 h-12 border-b px-4 flex items-center space-x-2">
              <button
                className="flex items-center space-x-2"
                onClick={() => {
                  navigate(-1)
                }}
              >
                <HiArrowLeft size={16} />
                <span className="text-sm">Back</span>
              </button>
            </div>
            <div className="pt-12">
              <Outlet />
            </div>
          </div>
        }
      >
        <Route
          path="bottom-sheet"
          element={
            <BottomSheetDrawer finalHeight={window.innerHeight - 48}>
              <div className="space-y-4">
                {range(20).map((key) => (
                  <div key={key} className="bg-slate-200 rounded-md h-10" />
                ))}
              </div>
            </BottomSheetDrawer>
          }
        />
        <Route
          path="draggable-list"
          element={
            <div className="p-4">
              <DraggableList
                items={useMemo(
                  () =>
                    range(5).map((key) => {
                      return {
                        item: (
                          <div
                            key={key}
                            className={clsx(
                              'h-20 rounded-md bg-slate-900 select-none px-2 flex items-center justify-center text-white',
                            )}
                            style={{ opacity: clamp((5 - key) / 5, 0.2, 1.0) }}
                          >
                            {key + 1}
                          </div>
                        ),
                        key: key,
                      }
                    }),
                  [],
                )}
                itemHeight={100}
              />
            </div>
          }
        />
        <Route
          path="swipable-cards"
          element={
            <SwipableCards
              images={useMemo(() => {
                return [
                  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                  'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                  'https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                ]
              }, [])}
            />
          }
        />
      </Route>
    </Routes>
  )
}
