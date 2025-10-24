const axios = require('axios');

async function testAPI() {
  try {
    console.log('Testing API endpoints...');
    
    // Test basic endpoint
    const basicResponse = await axios.get('http://localhost:5001');
    console.log('✅ Basic endpoint:', basicResponse.data);
    
    // Test registration
    const registerResponse = await axios.post('http://localhost:5001/api/auth/register', {
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin'
    });
    console.log('✅ Registration successful:', registerResponse.data);
    
    // Test login
    const loginResponse = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'admin@test.com',
      password: 'password123'
    });
    console.log('✅ Login successful:', loginResponse.data);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testAPI();
