import * as awis from 'awis';

const client = awis({
  key: 'secret',
  secret: 'secret',
});

const Requests = {
  'UrlInfo': {
    'ResponseGroup': [
    'Rank',
    'RankByCountry',
    'UsageStats',
    'AdultContent',
    'Speed',
    'Language',
    'LinksInCount',
    'SiteData',
    'Categories'
  ]},
  'TrafficHistory': {
    'ResponseGroup': [
      'History'
    ]
  },
  'SitesLinkingIn': {
    'ResponseGroup': [
      'SitesLinkingIn'
    ]
  }
}




export function lookup(domain: string) {
  return new Promise((resolve, reject) => {
    client({
      Action: 'UrlInfo',
      'Url': domain,
      'ResponseGroup': 'Categories',
    }, (err: any, data: any) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}

// lookup('trustpilot.com').then(data =>
//   {console.log(JSON.stringify(data, null, 2));}, 
//   err => {console.log(JSON.stringify(err));});

Object.entries(Requests).map(
  ([key, data]: [string, any], index: number) => 
    {
      // const {key, data} = object;
      console.log({'key': key, 'data': data, 'index': index});
    });

console.log(Object.entries(Requests));