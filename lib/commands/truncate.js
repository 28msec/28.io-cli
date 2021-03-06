'use strict';

var cli = require('commander');

var Config = require('../config').Config;
var $28 = Config.getAPIClient();

//Truncate Command
var truncateCmd = cli.command('truncate <project-name>');
truncateCmd.option('-s, --simulate', 'Simulate for extra safety.')
.description('Upload 28.io project.')
.action(function(projectName){
    projectName = projectName || Config.getDefaultProject();
    Config.refreshTokens(projectName).then(function(){
        var projectToken;
        try {
            projectToken = Config.getProjectToken(projectName);
        } catch(e) {
            console.error(('Project not found: ' + projectName).red);
            return;
        }
        $28.truncate(
            Config.getProjectEndpoint(projectName), projectToken,
            truncateCmd.simulate ? true : false,
            function(queries){
                return Config.filterQueries(queries);
            }
        ).then(function(){
            console.log('All done.'.grey);
        }).catch(Config.handleAPIError);
    });
});