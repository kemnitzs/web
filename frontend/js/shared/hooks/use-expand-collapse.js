import { useRef, useState, useLayoutEffect } from 'react'
import classNames from 'classnames'

function useExpandCollapse({
  initiallyExpanded = false,
  collapsedSize = '0',
  dimension = 'height',
  classes = {}
} = {}) {
  const ref = useRef()
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded)
  const [sizing, setSizing] = useState({
    size: null,
    needsExpandCollapse: null
  })

  useLayoutEffect(() => {
    const expandCollapseEl = ref.current
    if (expandCollapseEl) {
      const expandedSize =
        dimension === 'height'
          ? expandCollapseEl.scrollHeight
          : expandCollapseEl.scrollWidth

      const needsExpandCollapse = expandedSize > collapsedSize

      if (isExpanded) {
        setSizing({ size: expandedSize, needsExpandCollapse })
      } else {
        setSizing({
          size: needsExpandCollapse ? collapsedSize : expandedSize,
          needsExpandCollapse
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded])

  const expandableClasses = classNames(
    'expand-collapse-container',
    classes.container,
    !isExpanded ? classes.containerCollapsed : null
  )

  function handleToggle() {
    setIsExpanded(!isExpanded)
  }

  return {
    isExpanded,
    needsExpandCollapse: sizing.needsExpandCollapse,
    expandableProps: {
      ref,
      style: {
        [dimension === 'height' ? 'height' : 'width']: `${sizing.size}px`
      },
      className: expandableClasses
    },
    toggleProps: {
      onClick: handleToggle
    }
  }
}

export default useExpandCollapse
