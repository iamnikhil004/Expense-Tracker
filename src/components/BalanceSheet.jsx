export default function BalanceSheet({ balances }) {
  return (
    <div>
      <h3>Balances</h3>
      {Object.entries(balances).map(([user, bal]) => (
        <div key={user}>
          {user}: {bal.toFixed(2)}
        </div>
      ))}
    </div>
  );
}
