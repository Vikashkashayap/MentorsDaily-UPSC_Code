const axios = require('axios');

async function testAllEndpoints() {
  const endpoints = [
    'http://localhost:5000/api/v1/get-course',
    'http://localhost:5000/api/v1/get-affairs',
    'http://localhost:5000/api/v1/preparation/get-blog'
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`\nTesting: ${endpoint}`);
      const response = await axios.get(endpoint);
      console.log(`✓ SUCCESS - Status: ${response.status}`);
      console.log(`  Data count: ${response.data.data?.data?.length || response.data.data?.length || 'N/A'}`);
    } catch (error) {
      console.log(`✗ FAILED - Status: ${error.response?.status || 'No response'}`);
      console.log(`  Error: ${error.message}`);
    }
  }
}

testAllEndpoints();
