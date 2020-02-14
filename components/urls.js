export const BASE_PATH = 'https://uniacco.com/api/v1';
//export const BASE_PATH = 'http://localhost:8000/api/v1';

export function getPopularPropsPath(city) {
    return BASE_PATH+'/cities/' + city + '/properties?type=popular'
}

export function getUniversities(city) {
    return BASE_PATH+'/cities/'+city+'/places?type=university'
}

export function getCityPropsPath(city) {
    return BASE_PATH+'/cities/' + city + '/properties'
}

export function getPlacePropsPath(place) {
    return BASE_PATH+'/places/' + place + '/properties'
}

export function getSearchPath(query) {
    return BASE_PATH + '/search?q=' + query; // TODO: url encode this
}

export function getPropDetailsPath(country, city, propCode) {
    return BASE_PATH + '/' + country + '/' + city + '/' + propCode;
}

export function getLeadFormPath() {
    return BASE_PATH + '/' + 'leads/create';
}

export function getLoginPath() {
    return BASE_PATH + '/' + 'token/';
}

export function getTokenVerifyPath() {
    return BASE_PATH + '/' + 'token/verify/';
}

export function getManagerPath(city) {
    return BASE_PATH + '/cities/' + city + '/managers'
}

export function getCommuteData (propCode, university) {
    return BASE_PATH + '/scripts/commute-data/property/' +propCode+ '?place=' + university;
}

export function getPlacesInCountry(country,paginate){
    return BASE_PATH + '/countries/'+country+'/places?page='+paginate;
}

export function getCitiesInCountry(country){
  return BASE_PATH + '/countries/'+country+'/cities';
}

export function getSimilarProp(city_code,prop_code){
  return `${BASE_PATH}/cities/${city_code}/properties/${prop_code}/similar`;
}
export const newsletterPath = BASE_PATH+'/leads/subscription'

export const getPaymentPath = BASE_PATH+'/leads/details';

export const getCityPath = country => `${BASE_PATH}/countries/${country}/cities`;

export const getOfferPath = (city, propCode) => `${BASE_PATH}/offers?property=${propCode}&city=${city}`;

export const bookingFormPath = `${BASE_PATH}/leads/booking`

export const getNearestPlaceDataPath = (propCodes) => {
    return `${BASE_PATH}/scripts/commute-data/nearest-place/show?properties=${propCodes}`;
}

export const getPlaceCommuteDataPath = (place, codes) => (
    `${BASE_PATH}/scripts/commute-data/places/${place}/show?properties=${codes}`
);

export const homeHosting = `${BASE_PATH}/leads/host`

export const contactUsPath = `${BASE_PATH}/leads/contact`

export const getPropConfigsPath = codes => `${BASE_PATH}/configs?properties=${codes}`;

export const referPath = `${BASE_PATH}/leads/refer`
