import * as awis from 'awis';
import * as dotenv from 'dotenv';

const urls = process.argv.slice(2);

if (!urls || urls.length == 0) {
  console.log('No URL\'s specified. Terminate script.');
  process.exit(0);
}

dotenv.config();

const client = awis({
  key: process.env['AWIS_KEY'] || '',
  secret: process.env['AWIS_SECRET'] || '',
});

interface Request {
  ResponseGroup: string[];
}

interface Requests {
  [keyof: string]: Request;
}

const Requests: Requests = {
  'UrlInfo': {
    ResponseGroup: [
      'Rank',
      'RankByCountry',
      'UsageStats',
      'AdultContent',
      'Speed',
      'Language',
      'LinksInCount',
      'SiteData',
      'Categories'
    ]
  },
  'TrafficHistory': {
    ResponseGroup: [
      'History'
    ]
  },
  'SitesLinkingIn': {
    ResponseGroup: [
      'SitesLinkingIn'
    ]
  }
};

export function lookup(domain: string, action: string, responseGroup: string) {
  return new Promise((resolve, reject) => {
    client({
      Action: action,
      'Url': domain,
      'ResponseGroup': responseGroup,
    }, (err: any, data: any) => {
      if (err) {
        return reject(err)
      }

      console.log('Resolve action: ' + action);
      return resolve(data)
    })
  })
}

const promises = urls.map((url: string) => new Promise((resolve, reject) => {
    const sub_promises = Object.entries(Requests).map(
  ([key, data]: [string, Request]) =>
    {
      const responseGroups = data.ResponseGroup.join(',');
      return lookup(url, key, responseGroups);
    });
    resolve(Promise.all(sub_promises));
}
    ));

Promise.all(promises).then(data => console.log(JSON.stringify(data, null, 2)));
