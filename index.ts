import * as awis from 'awis';
import * as dotenv from 'dotenv';

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
}


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
      return resolve(data)
    })
  })
}

const DOMAIN = 'trustpilot.com';

const promises = Object.entries(Requests).map(
  ([key, data]: [string, Request], index: number) => 
    {
      // console.log({'key': key, 'data': data, 'index': index});
      const responseGroups = data.ResponseGroup.join(',');
      console.log(responseGroups);
      return lookup(DOMAIN, key, responseGroups);
    });

Promise.all(promises).then(data => console.log(data));
