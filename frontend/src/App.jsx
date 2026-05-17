import { useEffect, useState } from 'react';

export default function App() {
  const [testData, setTestData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    async function loadTestData() {
      try {
        const response = await fetch('/api/test-data');

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (isActive) {
          setTestData(data);
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError.message);
        }
      }
    }

    loadTestData();

    return () => {
      isActive = false;
    };
  }, []);

  const formattedResponse = testData
    ? JSON.stringify(testData, null, 2)
    : null;

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Amazen</p>
        <h1>Home page</h1>
        <p className="description">
          On reload, the app requests <code>getTestData</code> from the API and
          renders the formatted response below.
        </p>
        {error ? <p className="status error">{error}</p> : null}
        {!formattedResponse && !error ? (
          <p className="status">Loading test data...</p>
        ) : null}
        {formattedResponse ? (
          <pre className="response">{formattedResponse}</pre>
        ) : null}
      </section>
    </main>
  );
}
