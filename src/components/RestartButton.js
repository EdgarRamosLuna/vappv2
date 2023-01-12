import React, { useState } from 'react'
const Heroku = require('heroku-client');

const RestartButton = () => {
  const [status, setStatus] = useState('Idle')

  const handleClick = async () => {
    setStatus('Restarting')
    try {
      const heroku = new Heroku({ token: '9f6587e8-5db6-44ab-a03f-cc265a35f276' })
      const app = await heroku.get(`/apps/votesapp`)
      await heroku.patch(`/apps/${app.id}/dynos`, {
        body: {
          command: 'restart'
        }
      })
      setStatus('Done')
    } catch (err) {
      setStatus('Error')
    }
  }

  return (
    <button onClick={handleClick}>
      {status === 'Idle' ? 'Restart App' : status}
    </button>
  )
}

export default RestartButton