import { browser } from 'k6/experimental/browser';

export const options = {
    scenarios: {
      browser: {
        executor: 'constant-vus',
        vus: 3,
        duration: '10s',
        options: {
          browser: {
            type: 'chromium',
          },
        },
      },
    }
  }

export default async function(){
    const page = browser.newPage();

    try {
        await page.goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' });

        page.locator('input[name="login"]').type('admin');
        page.locator('input[name="password"]').type('123');

        page.screenshot({path: 'screenshot.png'})

    } finally {
        page.close();
    }
};