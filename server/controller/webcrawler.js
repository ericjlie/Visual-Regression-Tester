const axios = require('axios');
const cheerio = require('cheerio');

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

module.exports = {
  fetchPages: async (req, res, next) => {
    let urlArr = [req.query.url]
    const domainName = (new URL(req.query.url)).hostname.replace('www.', '')
    const regex = new RegExp(escapeRegExp(domainName));
    console.log(regex)
    const findUrls = async (url) => {
      const urlsInPage = [];
      const pageRes = await axios(url, {maxRedirects:50});
      if (pageRes.status !== 200) {
      } else {
        const $ = cheerio.load(pageRes.data);
        links = $('a');
        $(links).each((i, link) => {
          const href = $(link).attr('href');
          console.log(`checking ${href}`)
          if( regex.test(href) && !urlsInPage.includes(href) && !urlArr.includes(href)){
            urlsInPage.push(href);
            console.log(`adding ${href}`)
          } else {
            console.log(`rejected ${href}`)
            return
          }
        })
        urlArr = urlArr.concat(urlsInPage);

        // urlsInPage.forEach(urlToTest => findUrls(urlToTest))
      }
    }
    await findUrls(req.query.url);
    // console.log(urlArr);
    res.send(urlArr);
    return
  },
}