import { useDrag } from '@use-gesture/react'
import { clamp } from 'lodash'
import { useRef } from 'react'
import { animated, config, useSpring, useSprings } from 'react-spring'

function getStyles({
  totalImages,
  activeIndex,
  cardWith,
  x = 0,
}: {
  totalImages: number
  activeIndex: number
  cardWith: number
  x?: number
}) {
  return (index: number) => {
    if (index < activeIndex) {
      return {
        x: 0,
        zIndex: totalImages - index,
        scale: 0,
        opacity: 0,
        rotateZ: 0,
        display: 'none',
      }
    }

    if (activeIndex === index) {
      const normalizedX = x / (cardWith * 0.5)
      return {
        x,
        zIndex: totalImages - index,
        scale: 1.0,
        opacity: 1,
        rotateZ: normalizedX * 10,
        display: 'block',
        config: config.stiff,
      }
    }

    if (index === activeIndex + 1) {
      const normalizedX = Math.abs(x) / (cardWith * 0.5)

      return {
        x: 0,
        zIndex: totalImages - index,
        scale: clamp(normalizedX * 3, 0.9, 1.0),
        opacity: clamp(normalizedX * 2, 0.5, 1.0),
        rotateZ: 0,
        display: 'block',
        config: config.wobbly,
      }
    }

    return {
      x: 0,
      zIndex: totalImages - index,
      scale: 0.9,
      opacity: 0,
      rotateZ: 0,
      display: 'none',
    }
  }
}

type SwipableCardProps = {
  images: string[]
}

export default function SwipableCard({ images }: SwipableCardProps) {
  const cardWidth = useRef(window.innerWidth - 32)

  const [springs, springsApi] = useSprings(
    images.length,
    getStyles({ totalImages: images.length, activeIndex: 0, cardWith: cardWidth.current }),
  )
  const [{ x }, springApi] = useSpring(() => ({ x: 0 }))

  const bind = useDrag(
    ({ args: [originalIndex], movement: [x], active, cancel }) => {
      if (!active) {
        if (Math.abs(x) < cardWidth.current * 0.5) {
          springsApi.start(
            getStyles({
              totalImages: images.length,
              activeIndex: originalIndex,
              x: 0,
              cardWith: cardWidth.current,
            }),
          )
        } else {
          springsApi.start(
            getStyles({
              totalImages: images.length,
              activeIndex: originalIndex,
              x: cardWidth.current * 4 * Math.sign(x),
              cardWith: cardWidth.current,
            }),
          )
        }
        springApi.start({ x: 0 })
      } else {
        springsApi.start(
          getStyles({ totalImages: images.length, activeIndex: originalIndex, x, cardWith: cardWidth.current }),
        )
        springApi.start({ x })
      }
    },
    { axis: 'x' },
  )

  return (
    <div className="p-4">
      <div className="relative" style={{ height: window.innerHeight - 80 }}>
        {springs.map(({ x, zIndex, scale, rotateZ, display, opacity }, index) => {
          return (
            <animated.div
              {...bind(index)}
              className="h-full rounded-md overflow-hidden absolute inset-0 touch-none origin-bottom"
              key={images[index]}
              style={{ x, zIndex, scale, rotateZ, display, opacity }}
            >
              <img src={images[index]} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
            </animated.div>
          )
        })}
        <animated.div
          className="absolute left-4 bottom-4 text-white px-3 py-1.5 bg-green-500 uppercase text-sm rounded tracking-widest"
          style={{
            zIndex: images.length + 1,
            opacity: x.to([0, -cardWidth.current * 0.2], [0, 1]),
          }}
        >
          Like
        </animated.div>
        <animated.div
          className="absolute right-4 bottom-4 text-white px-3 py-1.5 bg-red-500 uppercase text-sm rounded tracking-widest"
          style={{
            zIndex: images.length + 1,
            opacity: x.to([0, cardWidth.current * 0.2], [0, 1]),
          }}
        >
          Nope
        </animated.div>
      </div>
    </div>
  )
}
