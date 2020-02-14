const fs = require("fs-extra");
const getPathsObject = require("./getPathsObject");
const formatDate = require("./formatDate");
const axios = require("axios");
// // ROBOTS.txt
// const robotsTxt = `User-agent: *
// Sitemap: https://uniacco.com/sitemap.xml
// Disallow:https://uniacco.com/get-in-touch`;

// fs.writeFileSync("public/robots.txt", robotsTxt);
// console.log("robots.txt saved!");

// SITEMAP.XML
const pathsObj = getPathsObject();
const today = formatDate(new Date());
const country = "uk";
const ignorePaths = [
  "/p/[id]" , 
  "/payment/[propCode]", 
  "/get-in-touch", 
  "/connect-with-us", 
  "/index", 
  "/login", 
  "/payment",
  "/booking"
];

const getCityProps = (country, cities, lastModified) => {
  return new Promise((resolve, reject) => {
    let citiesProps = [];
    for (let i = 0; i < cities.length; i++) {
      citiesProps.push(axios.get(`https://uniacco.com/api/v1/cities/${cities[i].code}/properties`));
    }

    Promise.all(citiesProps).then(function (values) {
      let result = values.map((value) => {
        return value.data;
      });

      let propertiesPromises = [];
      for (let i = 0; i < values.length; i++) {
        if (values[i].data.pages > 1) {

          for (let j = 2; j <= values[i].data.pages; j++) {
            propertiesPromises.push(axios.get(`https://uniacco.com/api/v1/cities/${values[i].data.city}/properties?page=${j}`));
          }
        }
      }

      Promise.all(propertiesPromises).then(function (results) {
        let resultPages = results.map((result) => {
          return result.data;
        });

        resolve(result.concat(resultPages));
      }).catch((err) => {
        console.log(err);
        reject(err);
      });

    }).catch((err) => {
      reject(err);
    });
  })
}

getCityUniversities = (cities) => {
  return new Promise((resolve, reject) => {
    let universitiesPromise = [];
    for (let i = 0; i < cities.length; i++) {
      universitiesPromise.push(axios.get(`https://uniacco.com/api/v1/cities/${cities[i].code}/places?type=university`));
    }

    Promise.all(universitiesPromise).then(function (values) {
      let result = values.map((value, index) => {
        return { places: value.data.places, city: cities[index]};
    });
    resolve(result);
  }).catch((err) => {
    console.log("error while fetching universities", err);
    reject();
  })
})
}

const getCities = () => {
  return new Promise((resolve, reject) => {
    axios.get(`https://uniacco.com/api/v1/countries/${country}/cities`).then(function (res) {
      let result = { cities: [], properties: [] };
      result.cities = JSON.parse(JSON.stringify(res.data.cities));

      getCityProps(country, res.data.cities).then((data) => {
        result.properties = data;

        getCityUniversities(res.data.cities).then((data) => {
          result.universities = data;
          resolve(result);
        }).catch((err) => {
          reject(err);
        })
      });
    }).catch((err) => {
      reject(err);
    });
  });
}

getCities().then((data) => {
  let siteMapArr = [];
  siteMapArr.push(`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`);

  Object.keys(pathsObj).map((path) => {
    if (path == "/[country]") {
      siteMapArr.push(`<url>
    <loc>https://uniacco.com/uk</loc>
    <lastmod>${
        pathsObj[path].lastModified
          ? formatDate(new Date(pathsObj[path].lastModified))
          : today
        }</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`);
    }
    else if (path == "/[country]/[city]") {
      data.cities.map((city) => {
        siteMapArr.push(`
        <url>
        <loc>https://uniacco.com/${country}/${city.code}</loc>
        <lastmod>${
          pathsObj[path].lastModified
            ? formatDate(new Date(pathsObj[path].lastModified))
            : today
          }</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>`);
      })
    }
    else if (path == "/[country]/[city]/[propCode]") {
      data.universities.map((university) => {
        university.places.map((place)=>{
          siteMapArr.push(`<url>
          <loc>https://uniacco.com/${country}/${place.code}</loc>
          <lastmod>${
            pathsObj[path].lastModified
              ? formatDate(new Date(pathsObj[path].lastModified))
              : today
            }</lastmod>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>`);
        });
      });

      data.properties.map((prop) => {
        let city = prop.city;
       prop.properties.map((property) => {
        siteMapArr.push( `<url>
          <loc>https://uniacco.com/${country}/${city}/${property.code}</loc>
          <lastmod>${
            pathsObj[path].lastModified
              ? formatDate(new Date(pathsObj[path].lastModified))
              : today
            }</lastmod>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>`);
        })
      })
    }
    else if (ignorePaths.includes(path)) {
      // ignore for now.
    }
    else {
      siteMapArr.push(`<url>
      <loc>https://uniacco.com${path}</loc>
      <lastmod>${
        pathsObj[path].lastModified
          ? formatDate(new Date(pathsObj[path].lastModified))
          : today
        }</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>`);
    }
  }); 

  siteMapArr.push(`</urlset>`);
  console.log("generated URLs",siteMapArr.length);
  fs.writeFileSync("public/sitemap.xml", siteMapArr.join(''));

  console.log("sitemap.xml saved!");
}).catch((err) => {
  console.log("could not fetch", err);
});
// // GOOGLE's VERIFY HTML
// TODO: Do we really need to use this Google Site verifiction
// As per documentation, The Google Site Verification API lets you develop applications or services that automate the process of verifying that the authenticated user owns a domain or website. This is important, since some Google services can only be used by site owners.
// Here are some of the things you can do with the API:

// Request a site verification token to place on user's domains or websites.
// Programmatically run a request that checks for the verification token and validates that the authenticated user is an owner of the domain or site.
// Integrate into applications that programmatically provision other Google services
// const googleVerify = `google-site-verification: google8f5d91a719b65f09.html`;
// fs.mkdirSync("out/sitemap.xml");
// fs.writeFileSync("out/sitemap.xml/google8f5d91a719b65f09.html", googleVerify);
// console.log("google8f5d91a719b65f09.html saved!");
