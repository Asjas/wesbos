import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

const { env } = (await getCloudflareContext());
const kv = env.OG;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const exePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function getBrowser() {
  // If we are in a cloudflare Worker, we need to use the browser binding and @cloudflare/puppeteer
  if(env.MYBROWSER) {
    console.log(`🎭 Using cloudflare puppeteer`);
    const puppeteer = await import("@cloudflare/puppeteer");
    return puppeteer.launch(env.MYBROWSER);
  };
  // // otherwise, we use puppeteer-core
  // const puppeteer = await import('puppeteer-core');
  // // Local dev, use local chrome
  // if (process.env.NODE_ENV === 'development') {
  //   console.log(`🎭 Using local puppeteer`);
  //   return puppeteer.launch({
  //     browser: 'chrome',
  //     args: [],
  //     executablePath: exePath,
  //     headless: true,
  //   });
  // }
  // // Otherwise, we use @sparticuz/chromium which fits into a serverless environment (like netlify functions)
  // console.log(`🎭 Using @sparticuz/chromium`);
  // const { default: chrome } = await import('@sparticuz/chromium');
  // return puppeteer.launch({
  //   browser: 'chrome',
  //   args: chrome.args,
  //   executablePath: await chrome.executablePath(),
  //   headless: chrome.headless,
  // });
}


async function getScreenshot(url: string) {
  // first check if this value has been cached
  const cachedImage = await kv.get(url, 'arrayBuffer');
  if (false &&cachedImage) {
    console.log('Returning cached image');
    return cachedImage;
  }
  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1.5 });
  await page.goto(url);
  await wait(1000);
  const buffer = await page.screenshot({ type: 'png' });
  // Cache to KV
  await kv.put(url, buffer, {
    expirationTtl: 60 * 60 * 24 * 30, // 30 days
  });
  // const base64Image = buffer.toString('base64');
  // cached.set(url, base64Image);
  return buffer;
}

export async function GET(request: NextRequest) {
  const qs = new URLSearchParams(request.nextUrl.searchParams);
  const url = `${process.env.URL || `http://localhost:3000`}/og?${qs.toString()}`;
  const photoBuffer = await getScreenshot(url);
  return new NextResponse(photoBuffer, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
