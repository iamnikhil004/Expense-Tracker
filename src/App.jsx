import { useState } from 'react'
import AddExpense from './components/AddExpense'
import ExpenseList from './components/ExpenseList'
import BalanceSheet from './components/BalanceSheet'
import Settlement from './components/Settlement'
import { computeBalances, settleBalances } from './utils/calculations'

export default function App() {
  const [users, setUsers] = useState([])
  const [expenses, setExpenses] = useState([])
  const [transactions, setTransactions] = useState([])
  const [newUserName, setNewUserName] = useState('')

  const balances = computeBalances(users, expenses)

  function addUser() {
    if (newUserName.trim() && !users.includes(newUserName)) {
      setUsers([...users, newUserName])
      setNewUserName('')
    }
  }

  function removeUser(userToRemove) {
    setUsers(users.filter((u) => u !== userToRemove))
    // Remove expenses that reference the deleted user
    setExpenses(
      expenses.filter(
        (ex) =>
          ex.payer !== userToRemove && !ex.participants.includes(userToRemove)
      )
    )
  }

  function renameUser(oldName, newName) {
    if (newName.trim() && !users.includes(newName)) {
      setUsers(users.map((u) => (u === oldName ? newName : u)))
      setExpenses(
        expenses.map((ex) => ({
          ...ex,
          payer: ex.payer === oldName ? newName : ex.payer,
          participants: ex.participants.map((p) =>
            p === oldName ? newName : p
          ),
        }))
      )
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Expense Tracker</h1>

      <div
        style={{
          marginBottom: 20,
          padding: 10,
          border: '1px solid #ccc',
          borderRadius: 5,
        }}
      >
        <h3>Manage Participants</h3>
        <div>
          <input
            type='text'
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder='Enter participant name'
            onKeyPress={(e) => e.key === 'Enter' && addUser()}
          />
          <button onClick={addUser}>Add Participant</button>
        </div>

        <div style={{ marginTop: 10 }}>
          {users.map((u) => (
            <div
              key={u}
              style={{
                marginBottom: 8,
                display: 'flex',
                gap: 10,
                alignItems: 'center',
              }}
            >
              <input
                type='text'
                value={u}
                onChange={(e) => renameUser(u, e.target.value)}
                style={{ padding: 5 }}
              />
              <button onClick={() => removeUser(u)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      <AddExpense
        users={users}
        onAdd={(ex) => setExpenses([...expenses, ex])}
      />

      <hr />

      <ExpenseList expenses={expenses} />

      <hr />

      <BalanceSheet balances={balances} />

      <button onClick={() => setTransactions(settleBalances(balances))}>
        Calculate Settlement
      </button>

      <Settlement transactions={transactions} />
    </div>
  )
}
