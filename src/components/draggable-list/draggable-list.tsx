import { useDrag } from '@use-gesture/react'
import { arrayMoveImmutable } from 'array-move'
import { clamp } from 'lodash'
import { useRef } from 'react'
import { useSprings, animated, config } from 'react-spring'

function getStyle({
  order,
  itemHeight,
  originalIndex = 0,
  currentIndex = 0,
  active = false,
  y = 0,
}: {
  order: number[]
  itemHeight: number
  // the original index of the item in the initial list
  originalIndex?: number
  // the current index of the item in the current re-ordered list
  // for the first time, these both values might be same, but once re-ordered it would update
  currentIndex?: number
  // is gesture active
  active?: boolean
  // gesture movement
  y?: number
}) {
  // index here refers the index of the item for which the style is being computed
  return (index: number) => {
    // if gesture is active and the current item is being dragged
    if (active && index === originalIndex) {
      return {
        // the position of the item would be the current index * itemHeight + the current y position
        // we have to add the current y position to the current index * itemHeight as the item is being dragged
        y: currentIndex * itemHeight + y,
        scale: 1.1,
        zIndex: 1,
        immediate: (key: string) => (key === 'zIndex' ? true : false),
        config: (key: string) => (key === 'y' ? config.stiff : config.default),
      }
    }

    // if the current item is not being dragged
    return {
      // the position of the item would be index of the current item in the current list multiplied by the item height
      y: order.indexOf(index) * itemHeight,
      scale: 1,
      zIndex: 1,
    }
  }
}

type DraggableListProps = {
  items: { item: React.ReactNode; key: string | number }[]
  itemHeight: number
}

export default function DraggableList({ items, itemHeight }: DraggableListProps) {
  const order = useRef(items.map((_, index) => index))

  const [springs, api] = useSprings(items.length, getStyle({ order: order.current, itemHeight }))

  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    // the original index of the index item in the initial list
    // find the current index of the item in the new list
    const currentIndex = order.current.indexOf(originalIndex)
    // current row refers to the row in the current list based on the drag position
    const currentRow = clamp(Math.round((currentIndex * itemHeight + y) / itemHeight), 0, items.length - 1)
    // calculate the new order of the items based on the current row
    // move the element from the currentIndex to current
    const newOrder = arrayMoveImmutable(order.current, currentIndex, currentRow)
    api.start(getStyle({ order: newOrder, itemHeight, originalIndex, currentIndex, active, y }))

    // once the item is dropped, update the order of the items, set the order as new order
    if (!active) {
      order.current = newOrder
    }
  })

  return (
    <div className="relative" style={{ height: items.length * itemHeight }}>
      {springs.map(({ y, scale, zIndex }, index) => {
        const { item, key } = items[index]
        return (
          <animated.div
            key={key}
            className="origin-center absolute w-full touch-none"
            style={{ y, scale, zIndex }}
            {...bind(index)}
          >
            {item}
          </animated.div>
        )
      })}
    </div>
  )
}
