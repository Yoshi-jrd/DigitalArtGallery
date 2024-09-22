import React, { useState } from 'react';

function Donate() {
  const [amount, setAmount] = useState('');

  const handleDonation = (e) => {
    e.preventDefault();
    console.log('Thank you for your donation:', amount);
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold">Support Our Art</h1>
      <form onSubmit={handleDonation} className="mt-4">
        <input
          type="number"
          placeholder="Amount ($)"
          className="p-2 border rounded text-lg"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button type="submit" className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Donate
        </button>
      </form>
    </div>
  );
}

export default Donate;
