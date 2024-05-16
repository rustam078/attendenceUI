let city="kolkata";

const url = `https://the-weather-api.p.rapidapi.com/api/weather/${city}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1c9b1f7fb1msh0d6549a4acecbdfp1adcf2jsn17cc81b29962',
		'X-RapidAPI-Host': 'the-weather-api.p.rapidapi.com'
	}
};

const test =async()=>{
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

test();