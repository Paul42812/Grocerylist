#Grocery List
#####v. 0.4 by Paul42812

###Features:
* Add Items to list 
* Remove items from list
* Export lists as csv
* Import csv lists
* Clear all items from the list

###Planned Features
* Config.json
* Custom error messages and labels
* Custom nameable lists 


<!--
###Configuration
* settings.json
	* labels:
		* title: Title of the page
		* settings_title: Title of configuration box
		* list
			* empty: Title of the empty listbox
			* items : Title of listbox with items
		* buttons
			* add_item: add item button
			* imp_list: import list button
			* exp_list: export list button
			* clear: clear button
	* valid_file: 
		* max_size: Max file size for import
	* errors:
		* file_upload:
			* too_large: too large file is selected
			* wrong_format: selected file has the wrong format
			* no_sellection: No file is selected 
		* add_itmes:
			* empty: The textbox is empty
			* alredy_there: The item is alredy in the list
-->

###Docker:
* docker build command: 
```bash
docker build -t grocerylist .
```

* docker run command: 
```bash 
docker run -ti -d -p 42812:80 --rm grocerylist
```

###Additional Informations:
* Dont select to huge files (Your system could crash)
* Config.json not functional jet
* This is an unstable version, there may be bugs.
* Exported lists alsways start with "Entries:"

###Used Scripts:
* FileSaver.js from [eligrey](https://github.com/eligrey/FileSaver.js)
