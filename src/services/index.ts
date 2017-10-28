export let services = [
    require('./user.service').UserService,
    require('./error.service').ErrorService,
    require('./capital.service').CapitalService,
    require('./weather.service').WeatherService,
    require('./country.service').CountryService,
]