const PROJECT_ID = '<YOUR_PROJECT_ID>'; // e.g. "abc123xy"
const DATASET = 'production'; // or your dataset name
const QUERY = encodeURIComponent('*[_type == "post"]{title}'); // sample query
const endpoint = `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${DATASET}?query=${QUERY}`;

async function fetchData() {
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': 'Bearer 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'
    }
  });
  const data = await response.json();
  console.log(data);
}

fetchData();
