import { Heap } from '../components/heap'

// Calculate each person's net balance
export function computeBalances(users, expenses) {
  const bal = {}
  users.forEach((u) => (bal[u] = 0))

  for (const ex of expenses) {
    // Initialize payer if not in users list
    if (!(ex.payer in bal)) bal[ex.payer] = 0

    const share = ex.amount / ex.participants.length
    bal[ex.payer] += ex.amount

    ex.participants.forEach((p) => {
      // Initialize participant if not in users list
      if (!(p in bal)) bal[p] = 0
      bal[p] -= share
    })
  }

  return bal
}

// Settlement using Heaps
export function settleBalances(balances) {
  const creditors = new Heap((a, b) => a.balance - b.balance) // max-heap
  const debtors = new Heap((a, b) => b.balance - a.balance) // max-heap for negative

  for (const [id, bal] of Object.entries(balances)) {
    if (bal > 0) creditors.push({ id, balance: bal })
    else if (bal < 0) debtors.push({ id, balance: -bal })
  }

  const tx = []

  while (creditors.size() && debtors.size()) {
    const C = creditors.pop()
    const D = debtors.pop()

    const amt = Math.min(C.balance, D.balance)

    tx.push({ from: D.id, to: C.id, amount: amt.toFixed(2) })

    C.balance -= amt
    D.balance -= amt

    if (C.balance > 0) creditors.push(C)
    if (D.balance > 0) debtors.push(D)
  }

  return tx // final minimal transactions
}
