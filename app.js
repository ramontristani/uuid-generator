/// <reference path="typings/node/node.d.ts"/>
var jf = require('jsonfile')
	, uuid = require('node-uuid')
	, prompt = require('prompt')
	, _ = require('lodash');

// /Users/ramontristani/Desktop/ids.json
console.log('\n************************\nUUID Generator - v1.0\n************************\n');

prompt.start();
prompt.get(['total', 'path'], function(error, input) {
	if (input.total > 0) {
		var ids = [];
		for (var i = 0; i < input.total; i++) {
			var id = uuid.v4().replace(/-/g, '');
			var found = _.find(ids, function(result) {
				return result === id;
			});
			
			if (!found) {
				console.log('Adding: ', id);
				ids.push(id);
			} else {
				i--;
			}
		}
		
		jf.writeFile(input.path, ids, function(error) {
			if (!error) {
				console.log('ID\'s saved to: ', input.path);
			} else {
				console.log('There was an error writing to disk!');
			}
			
			process.exit();
		});
	} else {
		console.log('Nothing to do...');
		process.exit();
	}
});
	
