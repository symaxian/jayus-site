/*

	FIXME: Local storage

*/

sandbox = {

	knownExamples: null,

	// Jayus

	canvas: null,

	display: null,

	// CodeMirror

	editor: null,

	CM_EDITOR_OPTIONS: {
		theme: 'lesser-dark',
		mode: 'javascript',
		lineNumbers: true,
		indentUnit: 4,
		onChange: function() {
			// sandbox.runCode();
			// if(sandbox.currentSourceIsLocal) {
				// sandbox.saveLocalFile(sandbox.currentSourceFilename,sandbox.getCode());
			// }
		}
	},

	// Local Storage

	hasLocalStorage: false,
	currentSourceIsLocal: false,
	currentSourceFilename: '',

	localFilenames: null,
	localFiles: null,

	INITIAL_LOCAL_CODE: '',
		// TODO: The initial code of a new local file

	LOCAL_FILE_NAME_DELIM: ';',
		// The delimiter used when storing files locally

	// Constants

	FPS_UPDATE_INTERVAL: 500,
		// How often to update the fps label

	FILE_DIR: 'files',
		// The directory the example files are in

	DEFAULT_FILE: 'Shapes-Simple_Shapes',
		// The default file

	DEBUG: true,

	//
	//  Initialization
	//__________________//

	getUrlParameters: function() {
		for(var i=0, vars = {}, param, paramArray = window.location.href.slice(window.location.href.indexOf('?')+1).split('&');i<paramArray.length;i++) {
			param = paramArray[i].split('=');
			vars[param[0]] = param[1];
		}
		return vars;
	},

	setUrlParameter: function(paramName, paramValue, clear) {
		clear = !!clear;
		var url = window.location.href;
		var queryString = location.search.substring(1);
		var newQueryString = '';
		if(clear) {
			newQueryString = paramName + '=' + paramValue;
		}
		else if(url.indexOf(paramName + '=') >= 0) {
			var decode = function(s) {
				return decodeURIComponent(s.replace(/\+/g, ' '));
			};
			var keyValues = queryString.split('&');
			for(var i in keyValues) {
				var key = keyValues[i].split('=');
				if(key.length > 1) {
					if(newQueryString.length > 0) {
						newQueryString += '&';
					}
					if(decode(key[0]) === paramName) {
						newQueryString += key[0] + '=' + encodeURIComponent(paramValue);
					}
					else{
						newQueryString += key[0] + '=' + key[1];
					}
				}
			}
		}
		else{
			if(url.indexOf('?') < 0) {
				newQueryString = '?' + paramName + '=' + paramValue;
			}
			else{
				newQueryString = queryString + '&' + paramName + '=' + paramValue;
			}
		}
		// window.location.href = window.location.href.split('?')[0] + '?' + newQueryString;
		window.history.pushState({}, '', window.location.href.split('?')[0] + '?' + newQueryString);
	},

	init: function sandbox_init() {

		if(sandbox.DEBUG) {
			console.groupCollapsed('Initializing Sandbox...');
		}

		// Construct the known files from the option list
		this.knownExamples = [];
		var options = $('option');
		for(var i=0;i<options.length;i++) {
			var option = options[i];
			var filename = option.innerHTML.replace(/ /g, '_');
			if(option.parentNode.tagName === 'OPTGROUP') {
				filename = option.parentNode.label+'-'+filename;
			}
			this.knownExamples.push(filename);
		}

		jayus.init();

		// Construct the editor field
		if(sandbox.DEBUG) {
			console.log('Constructing CodeMirror source instance');
		}
		sandbox.editor = CodeMirror($('#source')[0], sandbox.CM_EDITOR_OPTIONS);

		// Get the output canvas
		sandbox.canvas = document.getElementById('output');
		sandbox.display = new jayus.Display(sandbox.canvas);

		// Set display globally, to give the scripts access
		window.display = sandbox.display;

		sandbox.resizeEditors();

		// Load the locally saved files
		// sandbox.hasLocalStorage = sandbox.isLocalStorageSupported();
		// if(sandbox.hasLocalStorage) {
			// sandbox.loadLocalFiles();
			// sandbox.loadLocalStorageUI();
		// }

		// Get the url parameters
		sandbox.urlParams = sandbox.getUrlParameters();

		if(typeof sandbox.urlParams.file === 'undefined' && typeof sandbox.urlParams.f === 'string') {
			sandbox.urlParams.file = sandbox.urlParams.f;
		}

		if(typeof sandbox.urlParams.f === 'string') {
			// Load the specified example
			sandbox.loadExample(sandbox.urlParams.f, true);
			$('#FileSelector').val(sandbox.urlParams.f);
		}
		else{
			// Load the initial example
			sandbox.loadExample(sandbox.DEFAULT_FILE, true);
		}

		if(sandbox.urlParams.showDamage === 'true') {
			sandbox.display.showDamage = true;
		}

		$('#FileSelector').change(function() {
			var selected = $('#FileSelector option:selected');
			var src = selected.text().replace(/ /g, '_');
			if(selected[0].parentNode.tagName === 'OPTGROUP') {
				src = selected[0].parentNode.label+'-'+src;
			}
			sandbox.loadExample(src);
		});

		window.onresize = sandbox.resizeEditors;

		$('#start').click(function() {
			sandbox.runCode();
		});

		$('#stop').click(function() {
			jayus.stop();
		});

		var fps = $('#fps')[0];
		setInterval(function() {
			var text;
			if(jayus.running) {
				if(jayus.fps === Infinity) {
					text = 'Infinity';
				}
				else{
					text = (jayus.fps+'').slice(0, 4);
				}
			}
			else{
				text = '-';
			}
			if(text !== fps.innerText) {
				fps.innerText = text;
			}
		}, sandbox.FPS_UPDATE_INTERVAL);

		// End of initialization
		if(sandbox.DEBUG) {
			console.groupEnd();
		}

	},

	//
	//  Editor Management
	//_____________________//

	resizeEditors: function sandbox_resizedEditors() {
		// Get the width
		var width = $('#source')[0].offsetWidth;
		// Get the height
		var height = $(window).height() - $('#header').height() - $('#row1').height() - 30;
		// Set the sizes
		sandbox.editor.setSize(null, height);
		$('#size').text(width+' x '+height);
		sandbox.display.setSize(width, height);
	},

	getCode: function sandbox_getCode() {
		return sandbox.editor.getValue();
	},

	runCode: function sandbox_runCode() {

		if(jayus.running) {
			jayus.stop();
		}

		jayus.removeAllHandlers();
		jayus.box2d.worlds = [];
		sandbox.display.removeAllHandlers();

		sandbox.display.children.purge();
		sandbox.display.clearBg();

		var code = sandbox.editor.getValue();

		// try{
			eval(code);
		// }
		// catch(e) {
		// 	jayus.stop();
		// 	var msg = e.stack.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/\n/g, '<br>');
		// 	$( "#myModal" ).dialog({
		// 		dialogClass: "no-close",
		// 		buttons: [
		// 			{
		// 				text: "OK",
		// 				click: function() {
		// 					$( this ).dialog( "close" );
		// 				}
		// 			}
		// 		]
		// 	});
		// 	$('#myModal').dialog( "option", "modal" );
		// 	$('#modalBody').html(msg).wrap('<pre />');
		// 	throw e;
		// }

	},

	//
	//  Loading
	//___________//

	loadExample: function sandbox_loadExample(name, selectOption) {

		// TODO: Load from locally saved files

		selectOption = !!selectOption;

		// Check the name
		if(sandbox.knownExamples.indexOf(name) === -1) {
			console.warn('sandbox.loadExample() - Unknown example: "'+name+'", defaulting to: "'+sandbox.DEFAULT_FILE+'"');
			name = sandbox.DEFAULT_FILE;
		}

		// Change the url parameter, so if the page is reloaded the same example is reloaded
		sandbox.setUrlParameter('f', name, true);

		// Retrieve the file, the date is to invalidate caching, the type must be text so it's not executed
		$.get(sandbox.FILE_DIR+'/'+name+'.js?q='+(Date.now()),
			function(text) {
				// Set the selected option
				if(selectOption) {
					if(name.indexOf('-') !== -1) {
						// console.log(name.substr(name.indexOf('-')+1));
						name = name.substr(name.indexOf('-')+1);
					}
					name = name.replace(/_/g, ' ');
					$('#FileSelector').val(name);
				}
				// Set the source
				sandbox.editor.setValue(text);
				// Debug
				if(sandbox.DEBUG) {
					console.log('Example "'+name+'" loaded');
				}
				// Run the code
				sandbox.runCode();
			},
			'text'
		);

	},

	//
	//  Local Storage
	//_________________//

	isLocalStorageSupported: function() {
		return typeof window.localStorage === 'object' && window.localStorage !== null;
	},

	loadLocalStorageUI: function() {
		// Add the local files optgroup
		var localOptgroupNode = document.createElement('optgroup');
		localOptgroupNode.id = 'LocalFilesOptgroup';
		localOptgroupNode.label = 'Saved Files';
		$(localOptgroupNode).insertBefore('#ExamplesOptgroup');
		// Add the local file select entries
		for(var i=0;i<sandbox.localFilenames.length;i++) {
			var optionNode = document.createElement('option');
			optionNode.value = sandbox.localFilenames[i];
			optionNode.innerText = sandbox.localFilenames[i];
			localOptgroupNode.appendChild(optionNode);
		}
		// Button handlers
		// $('#NewFileButton').show().click(sandbox.newLocalFile);
		// $('#DeleteFileButton').click(function() {
			// sandbox.deleteLocalFile(sandbox.currentSourceFilename);
		// });
	},

	refreshLocalStorageUI: function() {
		// Remove the existing local files options
		var localOptgroupNode = $('#LocalFilesOptgroup')[0];
		$(localOptgroupNode).empty();
		// Add the local file select entries
		for(var i=0;i<sandbox.localFilenames.length;i++) {
			var optionNode = document.createElement('option');
			optionNode.value = sandbox.localFilenames[i];
			optionNode.innerText = sandbox.localFilenames[i];
			localOptgroupNode.appendChild(optionNode);
		}
	},

	loadLocalFiles: function() {
		// Initial blank arrays
		sandbox.localFilenames = [];
		sandbox.localFiles = [];
		// Get the data and check if string
		var filenames = localStorage.getItem('Jayus_Sandbox_Filenames');
		if(typeof filenames === 'string' && filenames.length) {
			// Split into array
			filenames = filenames.split(sandbox.LOCAL_FILE_NAME_DELIM);
			sandbox.localFilenames = filenames;
			// Load each file referenced in the array
			for(var i=0;i<filenames.length;i++) {
				sandbox.localFiles.push(localStorage.getItem('Jayus_Sandbox_File_'+filenames[i]));
			}
		}
	},

	newLocalFile: function() {
		var name = prompt('Enter filename:');
		if(typeof name !== 'string' || !name.length) {
			throw new Error('Filename error: '+name);
		}
		// Add the local file data
		var code = sandbox.INITIAL_LOCAL_CODE;
		sandbox.localFilenames.push(name);
		sandbox.localFiles.push(code);
		// Set the properties
		sandbox.setCode(code);
		sandbox.currentSourceIsLocal = true;
		sandbox.currentSourceFilename = name;
		// Save the files
		sandbox.saveLocalFiles();
		// Refresh the ui
		sandbox.refreshLocalStorageUI();
		// Set the selected file
		$('#FileSelector').val(name);
		$('#DeleteFileButton').show();
	},

	loadLocalFile: function(name) {
		var index = sandbox.localFilenames.indexOf(name);
		// Select the file
		$('#FileSelector').val(name);
		// Set the properties
		sandbox.setCode(sandbox.localFiles[index]);
		sandbox.currentSourceIsLocal = true;
		sandbox.currentSourceFilename = name;
		// Show the delete button
		$('#DeleteFileButton').show();
	},

	saveLocalFile: function(name, data) {
		localStorage.setItem('Jayus_Sandbox_File_'+name, data);
	},

	deleteLocalFile: function(name) {
		var index = sandbox.localFilenames.indexOf(name);
		sandbox.localFilenames.splice(index, 1);
		sandbox.localFiles.splice(index, 1);
		sandbox.saveLocalFiles();
		sandbox.refreshLocalStorageUI();
		sandbox.loadExample(sandbox.DEFAULT_FILE);
	},

	saveLocalFiles: function() {
		localStorage.setItem('Jayus_Sandbox_Filenames',sandbox.localFilenames.join(sandbox.LOCAL_FILE_NAME_DELIM));
		for(var i=0;i<sandbox.localFilenames.length;i++) {
			localStorage.setItem('Jayus_Sandbox_File_'+sandbox.localFilenames[i], sandbox.localFiles[i]);
		}
	}

};