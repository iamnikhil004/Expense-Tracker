import { useState } from 'react'

export default function AddExpense({ users, onAdd }) {
  const [payer, setPayer] = useState('')
  const [amount, setAmount] = useState('')
  const [participants, setParticipants] = useState([])

  function toggleParticipant(p) {
    setParticipants((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    const selectedPayer = payer || (users.length > 0 ? users[0] : '')
    if (!amount || participants.length === 0 || !selectedPayer) return

    onAdd({
      payer: selectedPayer,
      amount: parseFloat(amount),
      participants,
    })

    setAmount('')
    setParticipants([])
  }

  return (
    <div>
      <h3>Add Expense</h3>

      <form onSubmit={handleSubmit}>
        <label>Payer: </label>
        <select
          value={payer || (users.length > 0 ? users[0] : '')}
          onChange={(e) => setPayer(e.target.value)}
        >
          {users.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>

        <br />
        <br />

        <label>Amount: </label>
        <input
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <br />
        <br />

        <label>Participants: </label>
        <br />
        {users.map((u) => (
          <label key={u}>
            <input
              type='checkbox'
              checked={participants.includes(u)}
              onChange={() => toggleParticipant(u)}
            />
            {u}
          </label>
        ))}

        <br />
        <br />

        <button type='submit'>Add</button>
      </form>
    </div>
  )
}
