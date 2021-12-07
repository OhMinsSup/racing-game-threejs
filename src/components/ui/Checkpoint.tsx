import React, { useEffect } from 'react'
import { useGameState } from '@/atoms/gameState'
import { readableTime } from '@/utils/utils'

const Checkpoint: React.FC = () => {
  const [{ bestCheckpoint, checkpoint }, setState] = useGameState()

  const isBetter = !bestCheckpoint || checkpoint < bestCheckpoint
  const diff = bestCheckpoint ? checkpoint - bestCheckpoint : checkpoint

  useEffect(() => {
    if (!checkpoint) return
    const timeout = setTimeout(() => {
      const best = checkpoint && isBetter ? checkpoint : bestCheckpoint
      setState((prev) => ({ ...prev, bestCheckpoint: best, checkpoint: 0 }))
    }, 3000)
    return () => clearTimeout(timeout)
  })

  const color = isBetter ? 'green' : 'red'
  const split = `${isBetter ? '' : '+'}${readableTime(diff)}`

  return (
    <div className="checkpoint">
      <p>{readableTime(checkpoint)}</p>
      <p className={color}>{split}</p>
    </div>
  )
}

export default Checkpoint
