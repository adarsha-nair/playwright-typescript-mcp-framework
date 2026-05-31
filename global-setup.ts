import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('SauceDemo Global Setup Started');
  console.log(`Test Environment: ${process.env.NODE_ENV || 'local'}`);
  
  // Create reports directory if it doesn't exist
  const fs = require('fs');
  const path = require('path');
  
  const reportsDir = path.join(process.cwd(), 'reports');
  const screenshotsDir = path.join(reportsDir, 'screenshots');
  
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  
  // Pre-warm SauceDemo to check availability
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('Checking SauceDemo availability...');
    const response = await page.goto('https://www.saucedemo.com', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
    
    if (response && response.status() === 200) {
      console.log('SauceDemo is available and responsive');
    } else {
      console.warn(`SauceDemo returned status: ${response?.status()}`);
    }
  } catch (error) {
    console.error('SauceDemo availability check failed:', error);
    throw new Error('SauceDemo is not available for testing');
  } finally {
    await browser.close();
  }
  
  console.log('SauceDemo Global Setup Completed');
}

export default globalSetup;
