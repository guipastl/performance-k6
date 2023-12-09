import { browser } from 'k6/experimental/browser';
import { check } from 'k6';

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
    },
    thresholds: {
        checks: ["rate > 0.99"]
    }
  }

export default async function(){
    const page = browser.newPage();

    try {
        await page.goto('https://test.k6.io', { waitUntil: 'networkidle' });

        await Promise.all([
            page.waitForNavigation(),
            page.locator('a[href="/my_messages.php"]').click(),
        ]);

        page.locator('input[name="login"]').type('admin');
        page.locator('input[name="password"]').type('123');

        await Promise.all([
            page.waitForNavigation(),
            page.locator('input[type="submit"]').click(),
        ]);

        check(page, {
            'headers': page.locator('h2').textContent() == 'Welcome, admin!',
        })

    } finally {
        page.close();
    }
};