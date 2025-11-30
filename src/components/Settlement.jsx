export default function Settlement({ transactions }) {
  return (
    <div>
      <h3>Settlement</h3>
      {transactions.map((t, i) => (
        <div key={i}>
          <strong>{t.from}</strong> pays <strong>{t.to}</strong> → {t.amount}
        </div>
      ))}
    </div>
  )
}
