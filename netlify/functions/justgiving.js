exports.handler = async () => {
  const APP_ID = 'bb6edbbb';
  const PAGE   = 'jeff-lancaster-1000';

  try {
    const res = await fetch(`https://api.justgiving.com/${APP_ID}/v1/fundraising/pages/${PAGE}`, {
      headers: { 'Accept': 'application/json' }
    });

    if (!res.ok) throw new Error(`JustGiving returned ${res.status}`);
    const d = await res.json();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        raised:  parseFloat(d.totalRaisedOnline || d.grandTotalRaisedExcludingGiftAid || 0),
        target:  parseFloat(d.fundraisingTarget || 5000),
        donors:  parseInt(d.totalNumberOfDonations || 0) || null,
      })
    };
  } catch(e) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: e.message })
    };
  }
};
