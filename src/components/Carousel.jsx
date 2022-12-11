import React, { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width }}>
      {children}
    </div>
  )
}

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const updateIndex = (index) => {
    if (index < 0) index = React.Children.count(children) - 1
    else if (index >= React.Children.count(children)) index = 0

    setActiveIndex(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) updateIndex(activeIndex + 1)
    }, 1000)

    return () => {
      if (interval) clearInterval(interval)
    }
  })

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  })

  return (
    <div
      {...handlers}
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { width: '100%' })
        )}
      </div>
      <div className="indicators">
        <button onClick={() => updateIndex(activeIndex - 1)}>Prev</button>
        {React.Children.map(children, (child, index) => (
          <button
            className={`${index === activeIndex ? 'active' : ''}`}
            onClick={() => updateIndex(index)}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => updateIndex(activeIndex + 1)}>Next</button>
      </div>
    </div>
  )
}
export default Carousel
