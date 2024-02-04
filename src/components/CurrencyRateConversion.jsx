import React, { useState } from 'react';
import axios from 'axios';
import './CurrencyRateConversion.css'

function CurrencyRateConversion() {
  const [baseCurrency, setBaseCurrency] = useState('');
  const [targetCurrencies, setTargetCurrencies] = useState('');
  const [conversionRates, setConversionRates] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.forexrateapi.com/v1/latest`, {
        params: {
          api_key: '8fa131050f5b29ab252df0a8e783784c',
          base: baseCurrency,
          currencies: targetCurrencies,
        }
      });
      setConversionRates(response.data.rates);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleReset = () => {
    setBaseCurrency('');
    setTargetCurrencies('');
    setConversionRates(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="title">CURRENCY RATE CONVERSION</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="baseCurrency">Base Currency:</label>
          <input
            type="text"
            className="input"
            id="baseCurrency"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            placeholder="Enter the Currency Code"
          />
        </div>
        <div className="form-group">
          <label htmlFor="targetCurrencies">Target Currencies (comma-separated):</label>
          <input
            type="text"
            className="input"
            id="targetCurrencies"
            value={targetCurrencies}
            onChange={(e) => setTargetCurrencies(e.target.value)}
            placeholder="Enter the Currency Codes"
          />
        </div>
        <div className='button-group'>
          <button type="button" className="button" onClick={handleReset}>Reset</button>
          <button type="submit" className="button">Convert</button>
        </div>
      </form>
      {conversionRates && (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(conversionRates).map((currency) => (
              <tr key={currency}>
                <td>{currency}</td>
                <td>{conversionRates[currency]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CurrencyRateConversion;
