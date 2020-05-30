// SELECT ALL ELEMENTS
const country_name_element = document.querySelector(".country-name-text");
const world_cases_element = document.querySelector(".world-cases");
const total_cases_element = document.querySelector(".total-cases .value");
const active_cases_element = document.querySelector(".active-cases .value");
const new_cases_element = document.querySelector(".active-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");
const death_rate_element = document.querySelector(".death-rate");
const death_rate_value_element = document.querySelector(".death-rate-value");
const recovery_rate_element = document.querySelector(".recovery-rate");
const recovery_rate_value_element = document.querySelector(".recovery-rate-value");
const search_country_form = document.querySelector(".search-country");

var user_country = "India"
// VARIABLES
var t_cases,
    a_cases,
    w_cases,
    n_cases,
    r_cases,
    t_deaths,
    n_deaths,
    death_rate,
    recovery_rate

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
    recovery_rate_element.classList.forEach(className => {
        if (className.startsWith('p')) {
            recovery_rate_element.classList.remove(className);
        }
    });
    death_rate_element.classList.forEach(className => {
        if (className.startsWith('p')) {
            death_rate_element.classList.remove(className);
        }
    });

    t_cases = 0;
    a_cases = 0;
    n_cases = 0;
    r_cases = 0;
    t_deaths = 0;
    n_deaths = 0;
    death_rate = 0;
    recovery_rate = 0;

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
        console.log(t_cases)
        n_cases = data['response']['0']['cases']['new']
        console.log(n_cases);
        r_cases = data['response']['0']['cases']['recovered']
        console.log(r_cases);
        n_deaths = data['response']['0']['deaths']['new']
        console.log(n_deaths);
        t_deaths = data['response']['0']['deaths']['total']
        console.log(t_deaths);
        a_cases = t_cases - r_cases - t_deaths
        console.log(a_cases);
        death_rate = t_cases/t_deaths
        recovery_rate = t_cases/r_cases

        if (n_deaths == null){
            n_deaths = "+0";
        }

        if (n_cases == null){
            n_cases = "+0";
        }

    })
        .then (() => {
        UpdateUI(t_cases ,a_cases, n_cases, r_cases, t_deaths, n_deaths, death_rate, recovery_rate);
//        UpdateChart(user_country);
    })
        .catch(Error => {
        alert(Error);
    })

}

fetchData(user_country);

function UpdateUI(t_cases, a_cases, n_cases, r_cases, t_deaths, n_deaths, recovery_rate, death_rate) {
    total_cases_element.innerHTML = numberWithCommas(t_cases) || 0;
    active_cases_element.innerHTML = numberWithCommas(a_cases) || 0;
    new_cases_element.innerHTML = numberWithCommas(n_cases) || 0;
    recovered_element.innerHTML = numberWithCommas(r_cases) || 0;
    deaths_element.innerHTML = numberWithCommas(t_deaths) || 0;
    new_deaths_element.innerHTML = numberWithCommas(n_deaths) || 0;
    recovery_rate_value_element.innerHTML = recovery_rate.toFixed(1) + "%";
    death_rate_value_element.innerHTML = death_rate.toFixed(1) + "%";
    recovery_rate_element.classList.add("p"+ parseInt(recovery_rate));
    death_rate_element.classList.add("p"+ parseInt(death_rate));


    $(".value").counterUp({delay:10, time:2000});

    $(".new-value").counterUp({delay:10, time:1000});


}

function changeCountry() {
    var text = document.getElementById("myInput").value;
    user_country = text;
    fetchData(user_country);
//    bar_ctx.destroy();
//    UpdateChart(user_country)
}

function openSearchCountryForm() {
    search_country_form.classList.remove('hide');
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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


