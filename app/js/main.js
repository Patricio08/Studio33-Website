window.onload = function(e) { 
    let context = {}   
    const cotaStates = require('./sky-controller')(context)

    const states = Object.assign(cotaStates)

    require('./state-router')(states, "homepage")
}
