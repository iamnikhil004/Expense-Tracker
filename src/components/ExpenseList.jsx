export default function ExpenseList({ expenses }) {
  return (
    <div>
      <h3>Expenses</h3>
      {expenses.map((ex, i) => (
        <div key={i}>
          <strong>{ex.payer}</strong> paid {ex.amount} for {ex.participants.join(", ")}
        </div>
      ))}
    </div>
  );
}
