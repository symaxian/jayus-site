
sandbox = {

	FILE_DIR: 'files',

	INITIAL_FILE: 'SimpleShapes',

	FILE_NAME_DELIM: ';',

	// CodeMirror

	editor: null,

	CM_EDITOR_OPTIONS: {
		theme: 'lesser-dark',
		mode: 'javascript',
		lineNumbers: true,
		indentUnit: 4,
		onChange: function(){
			// sandbox.runCode();
			// if(sandbox.currentSourceIsLocal){
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

	//
	//  Initialization
	//__________________//

	init: function(){

		jayus.init();

		// Initialize group
		console.groupCollapsed('Initializing Torch...');

		// Construct the editor field
		console.log('Constructing CodeMirror source instance');
		sandbox.editor = CodeMirror($('#source')[0],sandbox.CM_EDITOR_OPTIONS);

		// Get the output canvas
		sandbox.canvas = document.getElementById('output');
		display = new jayus.Display(sandbox.canvas);

		sandbox.resizeEditors();

		// Load the locally saved files
		// sandbox.hasLocalStorage = sandbox.isLocalStorageSupported();
		// if(sandbox.hasLocalStorage){
			// sandbox.loadLocalFiles();
			// sandbox.loadLocalStorageUI();
		// }

		// Load the initial file
		sandbox.loadExample(sandbox.INITIAL_FILE);

		// End of initialization
		console.groupEnd();

		$('#FileSelector').change(function(){
			var selected = $('option:selected',this);
			if(selected.parent()[0].id == "ExamplesOptgroup"){
				sandbox.loadExample($('#FileSelector').val());
			}
			else if(selected.parent()[0].id == "LocalFilesOptgroup"){
				sandbox.loadLocalFile($('#FileSelector').val());
			}
		});

		$(window).resize(function(){
			console.log(1);
			sandbox.resizeEditors();
		});

		$('#start').click(function(){
			sandbox.runCode();
		});

		$('#stop').click(function(){
			jayus.stop();
		});

		var fps = $('#fps')[0];
		setInterval(function(){
			if(jayus.running){
				fps.innerText = (jayus.fps+'').slice(0,4);
			}
			else{
				fps.innerText = '-';
			}
		},500);

	},

	runCode: function(){

		jayus.stop();

		display.purge();

		var code = sandbox.editor.getValue();

		try{
			eval(code);
		}
		catch(e){
			jayus.stop();
			var msg = e.stack.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/\n/g, '<br>');
			$('#modalBody').html(msg).wrap('<pre />');
			$('#myModal').modal();
		}

	},

	//
	//  Editor Management
	//_____________________//

	resizeEditors: function(){
		// Get the width
		var width = $('#source')[0].offsetWidth;
		// Get the height
		var height = $(window).height() - $('#header').height() - $('#row1').height() - 30;
		// Set the sizes
		sandbox.editor.setSize(null,height);
		display.setSize(width,height);

		$('#size').text(width+'x'+height);
	},

	getCode: function(){
		return sandbox.editor.getValue();
	},

	//
	//  Loading
	//___________//

	loadExample: function(name){

		$.get(sandbox.FILE_DIR+'/'+name+'.js',
			function(text){
				// Set the selected option
				$('#FileSelector').val(name);
				// Set the source
				sandbox.editor.setValue(text);
				// Debug
				console.log('Example script "'+name+'" loaded');
				// Run the code
				sandbox.runCode();
			}, 'script'
		);

	},

	//
	//  Local Storage
	//_________________//

	isLocalStorageSupported: function(){
		try {
			return (typeof window.localStorage === 'object') && (window.localStorage !== null);
		}
		catch(e){
			return false;
		}
	},

	loadLocalStorageUI: function(){
		// Add the local files optgroup
		var localOptgroupNode = document.createElement('optgroup');
		localOptgroupNode.id = 'LocalFilesOptgroup';
		localOptgroupNode.label = 'Saved Files';
		$(localOptgroupNode).insertBefore('#ExamplesOptgroup');
		// Add the local file select entries
		for(var i=0;i<sandbox.localFilenames.length;i++){
			var optionNode = document.createElement('option');
			optionNode.value = sandbox.localFilenames[i];
			optionNode.innerText = sandbox.localFilenames[i];
			localOptgroupNode.appendChild(optionNode);
		}
		// Button handlers
		// $('#NewFileButton').show().click(sandbox.newLocalFile);
		// $('#DeleteFileButton').click(function(){
			// sandbox.deleteLocalFile(sandbox.currentSourceFilename);
		// });
	},

	refreshLocalStorageUI: function(){
		// Remove the existing local files options
		var localOptgroupNode = $('#LocalFilesOptgroup')[0];
		$(localOptgroupNode).empty();
		// Add the local file select entries
		for(var i=0;i<sandbox.localFilenames.length;i++){
			var optionNode = document.createElement('option');
			optionNode.value = sandbox.localFilenames[i];
			optionNode.innerText = sandbox.localFilenames[i];
			localOptgroupNode.appendChild(optionNode);
		}
	},

	loadLocalFiles: function(){
		// Initial blank arrays
		sandbox.localFilenames = [];
		sandbox.localFiles = [];
		// Get the data and check if string
		var filenames = localStorage.getItem('Torch_Filenames');
		if(typeof filenames === 'string' && filenames.length){
			// Split into array
			filenames = filenames.split(sandbox.FILE_NAME_DELIM);
			sandbox.localFilenames = filenames;
			// Load each file referenced in the array
			for(var i=0;i<filenames.length;i++){
				sandbox.localFiles.push(localStorage.getItem('Torch_File_'+filenames[i]));
			}
		}
	},

	newLocalFile: function(){
		var name = prompt('Enter filename:');
		if(typeof name !== 'string' || !name.length){
			throw new Error('Filename error: '+name);
		}
		// Add the local file data
		var code = 'package \''+name+'\'\n\nmain: function(){\n\tconsole.log(\'Hi!\')\n}';
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

	loadLocalFile: function(name){
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

	saveLocalFile: function(name,data){
		localStorage.setItem('Torch_File_'+name,data);
	},

	deleteLocalFile: function(name){
		var index = sandbox.localFilenames.indexOf(name);
		sandbox.localFilenames.splice(index,1);
		sandbox.localFiles.splice(index,1);
		sandbox.saveLocalFiles();
		sandbox.refreshLocalStorageUI();
		sandbox.loadExample(sandbox.INITIAL_FILE);
	},

	saveLocalFiles: function(){
		localStorage.setItem('Torch_Filenames',sandbox.localFilenames.join(sandbox.FILE_NAME_DELIM));
		for(var i=0;i<sandbox.localFilenames.length;i++){
			localStorage.setItem('Torch_File_'+sandbox.localFilenames[i],sandbox.localFiles[i]);
		}
	}

};

//
//  Utility
//___________//

function applyObject(source,destination){
	// Copy all the properties onto the destination
	for(var item in source){
		if(source.hasOwnProperty(item)){
			destination[item] = source[item];
		}
	}
	return destination;
}

function getUrlParameters(){
	for(var i=0, vars = {}, param, paramArray = window.location.href.slice(window.location.href.indexOf('?')+1).split('&');i<paramArray.length;i++){
		param = paramArray[i].split('=');
		vars[param[0]] = param[1];
	}
	return vars;
}