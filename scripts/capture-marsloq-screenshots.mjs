import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";

const OUT_DIR = path.resolve("public/assets/marsloq");

async function capturePortal({ name, loginUrl, username, password, menuSelectors }) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();
  const dir = path.join(OUT_DIR, name);
  await mkdir(dir, { recursive: true });

  const shots = [];

  try {
    await page.goto(loginUrl, { waitUntil: "networkidle", timeout: 60000 });
    await page.screenshot({ path: path.join(dir, "01-login.png"), fullPage: true });
    shots.push("01-login.png");

    const userInput = page
      .locator('input[type="text"], input[name="username"], input[name="user"], input[id*="user" i], input[placeholder*="user" i]')
      .first();
    const passInput = page.locator('input[type="password"]').first();
    await userInput.fill(username);
    await passInput.fill(password);

    const submit = page
      .locator('button[type="submit"], input[type="submit"], button:has-text("Login"), button:has-text("Sign in"), button:has-text("เข้าสู่ระบบ")')
      .first();
    await submit.click();
    await page.waitForTimeout(4000);
    await page.screenshot({ path: path.join(dir, "02-dashboard.png"), fullPage: true });
    shots.push("02-dashboard.png");

    const navLinks = page.locator("nav a, aside a, .sidebar a, .menu a, [role='menuitem'], .ant-menu-item, .el-menu-item");
    const count = await navLinks.count();
    const seen = new Set();
    let idx = 3;

    for (let i = 0; i < Math.min(count, 20); i++) {
      const link = navLinks.nth(i);
      const text = ((await link.innerText().catch(() => "")) || "").trim().replace(/\s+/g, " ");
      if (!text || text.length < 2 || seen.has(text)) continue;
      if (/logout|sign out|ออกจากระบบ/i.test(text)) continue;

      seen.add(text);
      try {
        await link.click({ timeout: 5000 });
        await page.waitForTimeout(2500);
        const slug = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
          .slice(0, 40);
        const file = `${String(idx).padStart(2, "0")}-${slug || "page"}.png`;
        await page.screenshot({ path: path.join(dir, file), fullPage: true });
        shots.push(file);
        idx++;
        if (idx > 10) break;
      } catch {
        // skip unreachable menu items
      }
    }
  } catch (err) {
    await page.screenshot({ path: path.join(dir, "error.png"), fullPage: true }).catch(() => {});
    console.error(`[${name}] error:`, err.message);
  } finally {
    await browser.close();
  }

  return { name, dir, shots };
}

const portals = [
  {
    name: "marslog-8885",
    loginUrl: "https://marslog.duckdns.org:8885/login",
    username: "sysadmin",
    password: "sysadmin",
  },
  {
    name: "marslog-8110",
    loginUrl: "https://marslog.duckdns.org:8110/login",
    username: "admin",
    password: "KyberTech@Info64",
  },
];

const results = [];
for (const portal of portals) {
  console.log(`Capturing ${portal.name}...`);
  results.push(await capturePortal(portal));
}

console.log(JSON.stringify(results, null, 2));
