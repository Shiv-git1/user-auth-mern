import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [quote, setQuote] = useState('')
  const [tempQuote, setTempQuote] = useState('')

  const navigate = useNavigate()

  async function populateQuote(event) {
    event.preventDefault()

    const req = await fetch('http://localhost:1337/api/quote', {
      headers: {
        'x-axxess-token': localStorage.getItem('token'),
      },
    })

    const data = req.json()
    if (data.status === 'ok') {
      setQuote(tempQuote)
      setTempQuote('')
    } else {
      alert(data.error)
    }
    console.log(data)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt.decode(token)
      if (!user) {
        localStorage.removeItem('token')
        navigate('/login')
      } else {
        populateQuote()
      }
    }
  }, [])

  return (
    <div>
      <h1>Your quote: {quote || 'No quote found'} </h1>
      <form>
        <input
          type="text"
          placeholder="Quote"
          value={tempQuote}
          onChange={(e) => setTempQuote(e.target.value)}
        />
      </form>
    </div>
  )
}

export default Dashboard
