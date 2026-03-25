import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  console.log("Navigating to local dev server...");
  await page.goto('http://localhost:5173/members');
  
  console.log("Waiting for the button...");
  await page.waitForSelector('button');
  
  const buttons = await page.$$('button');
  let leaderboardBtn = null;
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes("Xếp hạng chăm chỉ")) {
      leaderboardBtn = btn;
      break;
    }
  }
  
  if (leaderboardBtn) {
    console.log("Found Leaderboard button. Clicking...");
    await leaderboardBtn.click();
    
    // Wait for route change
    await page.waitForTimeout(2000);
    
    const url = page.url();
    console.log("Current URL after click:", url);
    
    const bodyText = await page.evaluate(() => document.body.innerText);
    if (bodyText.includes("Top 3") || bodyText.includes("Xếp hạng") || bodyText.includes("SESSIONS")) {
      console.log("SUCCESS: Leaderboard rendered properly.");
    } else {
      console.log("FAILURE: Page did not render Leaderboard text.");
      console.log("Body snippet:", bodyText.substring(0, 500));
    }
  } else {
    console.log("Could not find the Xếp hạng chăm chỉ button!");
  }

  await browser.close();
})();
