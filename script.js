document.addEventListener('DOMContentLoaded', async () => {
  const contentList = document.getElementById('content-list');

  try {
    // Replace with your actual GROQ API endpoint
    const GROQ_API_URL = 'https://<YOUR_SANITY_PROJECT_ID>.api.sanity.io/v2021-06-07/data/query/<DATASET>?query=<YOUR_ENCODED_GROQ_QUERY>';
    
    // Example: a query that returns all documents of type "post" with their title
    // const GROQ_API_URL = 'https://xyz123.api.sanity.io/v2021-06-07/data/query/production?query=*[_type=="post"]{title}';

    const response = await fetch(GROQ_API_URL);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const jsonData = await response.json();
    const data = jsonData.result;
    
    // Clear loading text
    contentList.innerHTML = '';

    if (data && data.length > 0) {
      data.forEach(item => {
        const p = document.createElement('p');
        p.textContent = item.title || 'Untitled Item';
        contentList.appendChild(p);
      });
    } else {
      contentList.textContent = 'No content found.';
    }
  } catch (error) {
    console.error(error);
    contentList.textContent = 'Failed to load content.';
  }
});
