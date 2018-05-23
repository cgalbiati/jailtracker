const fetch = require('node-fetch');

const getInmatesListFormystery = (url) => (
    fetch(url)
        .then(res => res.json())
        .then(jsonRes => (
            jsonRes.data.map(inmate => inmate)
        ))
)

const limit = 10
const mystery = 1527037588005;

const omsBase = 'https://omsweb.public-safety-cloud.com/jtclientweb/(S(r15nhsoo2z2nkygihp4mkvvz))//(S(r15nhsoo2z2nkygihp4mkvvz))/JailTracker';
const getListUrl = (dataLocId = mystery) => `${omsBase}/GetInmates?_dc=${dataLocId}&start=0&limit=${limit}&sort=LastName&dir=ASC`;


const getInmateUrl = (arrestNum, dataLocId = mystery) => `${omsBase}/GetInmate?_dc=${dataLocId}&arrestNo=${arrestNum}`;


const detailLoc = 1527038416724
// 1527038437582
// 1527038629418
// 1527038702966

const getInmateDetailsOms = () => (
    getInmatesListFormystery(getListUrl())
        .then(list => (
            Promise.all(list.map(inmate => (
                // console.log(inmate)
                fetch(getInmateUrl(inmate.ArrestNo)).then(res => res.json())
            )))
        ))
        .then(inmates => (
            console.log('got inmates', inmates)
        ))
)



getInmateDetailsOms()


