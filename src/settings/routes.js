(function(){
    'use strict';
    const user = require('components/user/routes');
    const player = require('components/player/routes');

    module.exports = [].concat(
        user,
        player
    );
}());