exports.handler = async () => {
  const APP_ID = 'bb6edbbb';
  const PAGE = 'jeff-lancaster-1000';

  const urls = [
    `https://api.justgiving.com/${APP_ID}/v1/fundraising/pages/${PAGE}`,
    `https://api.justgiving.com/${APP_ID}/v1/campaigns/${PAGE}`,
  ];

  let lastError = '';
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) { lastError = `${url} returned ${res.status}`; continue; }
      const d = await res.json();
      const raised = parseFloat(d.totalRaisedOnline ?? d.grandTotalRaisedExcludingGiftAid ?? d.totalAmountRaised ?? 0);
      const target = parseFloat(d.fundraisingTarget ?? d.targetAmount ?? 5000);
      const donors = parseInt(d.totalNumberOfDonations ?? d.donationCount ?? 0) || null;
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ raised, target, donors })
      };
    } catch(e) { lastError = e.message; }
  }

  return {
    statusCode: 500,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ error: lastError })
  };
};
