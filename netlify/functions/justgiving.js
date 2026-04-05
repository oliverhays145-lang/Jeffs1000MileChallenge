exports.handler = async () => {
  try {
    const res = await fetch(
      'https://www.justgiving.com/api/fundraising/page/jeff-lancaster-1000',
      { headers: { 'Accept': 'application/json', 'Origin': 'https://www.justgiving.com' } }
    );
    const text = await res.text();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ status: res.status, body: text.slice(0, 2000) })
    };
  } catch(e) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: e.message })
    };
  }
};
