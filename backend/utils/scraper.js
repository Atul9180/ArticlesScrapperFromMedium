import puppeteer from "puppeteer";
import config from "../config.js";

async function scrapeMediumArticles(searchQuery) {
  try {
    const browser = await puppeteer.launch(
      {
        args:[
          "--disable-setuid-sandbox",
          "--no-sandbox",
          "--single-process",
          "--no-zygote",
          ],
        executablePath:
          config.NODE_ENV === "production" ? config.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
      }
    );
    const page = await browser.newPage();
    await page.goto(`https://www.medium.com/search?q=${searchQuery}`);

    const content = await page.evaluate(() => {
      const articles = Array.from(document.querySelectorAll("div.bg.l"));
      return articles
        .map((article) => {
          const titleUrl = article
            .querySelector("[data-href]")
            ?.getAttribute("data-href");
          const title = article.querySelector(
            "h2.be.kl.mi.mj.mk.ml.mm.mn.mo.mp.mq.mr.ms.mt.mu.mv.mw.mx.my.mz.na.nb.nc.nd.ne.nf.ng.ee.ef.eg.ei.ek.bj"
          )?.innerText;
          const date = article.querySelector("div.ab.q span")?.innerText;
          const authorName = article.querySelector(
            "p.be.b.ik.z.ee.hl.ef.eg.eh.ei.ej.ek.bj"
          )?.innerText;
          return { titleUrl, title, date, authorName };
        })
        .slice(0, 5);
    });

    await browser.close();
    return content;
  } catch (error) {
    console.error(error);
    return {error: `Something went wrong while running Puppeteer: ${error}`};
  }
}

export default scrapeMediumArticles;
