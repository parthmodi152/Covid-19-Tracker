// SELECT ALL ELEMENTS
const country_name_element = document.querySelector(".country-name-text");
const world_cases_element = document.querySelector(".world-cases");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");




var user_country = "India"
// VARIABLES
var t_cases,
    w_cases,
    n_cases,
    r_cases,
    t_deaths,
    n_deaths

/* ---------------------------------------------- */
/*                API URL AND KEY                 */
/* ---------------------------------------------- */

// LATEST STATS API - RAPIDAPI COVID-19


    w_cases = 0;
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "e61919d4bcmshc65699715b2fe9fp1e484bjsn18556ee1c35e"
        }
    })
        .then( response => {
        return response.json();
    })
        .then( data => {
        w_cases = data['total_cases'];
        world_cases_element.innerHTML = w_cases;
        $(".world-value").counterUp({delay:10, time:2000});
        console.log(w_cases);

    })


function fetchData(user_country){
    country_name_element.innerHTML = user_country;
    t_cases = 0;
    n_cases = 0;
    r_cases = 0;
    t_deaths = 0;
    n_deaths = 0;
    var fetchLink = "https://covid-193.p.rapidapi.com/statistics?country=" + user_country;
    fetch(fetchLink, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "e61919d4bcmshc65699715b2fe9fp1e484bjsn18556ee1c35e"
        }
    })
        .then( response => {
        return response.json();
    })
        .then( data => {
        console.log(user_country);
        t_cases = data['response']['0']['cases']['total']
        console.log(t_cases);
        n_cases = data['response']['0']['cases']['new']
        console.log(n_cases);
        r_cases = data['response']['0']['cases']['recovered']
        console.log(r_cases);
        n_deaths = data['response']['0']['deaths']['new']
        console.log(n_deaths);
        t_deaths = data['response']['0']['deaths']['total']
        console.log(t_deaths);

        if (n_deaths == null){
            n_deaths = "+0";
        }

        if (n_cases == null){
            n_cases = "+0";
        }

    })
        .then (() => {
        UpdateUI(t_cases, n_cases, r_cases, t_deaths, n_deaths);
    })
        .catch(Error => {
        alert(Error);
    })

}

fetchData(user_country);

function UpdateUI(t_cases, n_cases, r_cases, t_deaths, n_deaths) {
    total_cases_element.innerHTML = t_cases || 0;
    new_cases_element.innerHTML = n_cases || 0;
    recovered_element.innerHTML = r_cases || 0;
    deaths_element.innerHTML = t_deaths || 0;
    new_deaths_element.innerHTML = n_deaths || 0;
    

    $(".value").counterUp({delay:10, time:2000});
    
    $(".new-value").counterUp({delay:10, time:1000});


}

function changeCountry() {
    var text = document.getElementById("myInput").value;
    user_country = text;
    fetchData(user_country);
}


$('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});


