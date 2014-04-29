js-field-observer
=================

Informs about number of filled input elements and allows quick clearing.

Project url: https://github.com/Moonbird-IT/js-field-observer
Author: Sascha Meyer

Feel free to use, change and distribute this plugin. If you extend or optimise the plugin, please let me know and I'll update the git repository with your changes.

Open issues:
---------------
* The plugin uses jQuery but right now it's not a jQuery plugin (on the road map)
* If one field is observed by more than one observer, clearing the field using one observer's clear functionality will not inform the other observer.

Usage:
---------------
1.) Add the JS and CSS references
2.) Set up a new observer:

    var fieldObserver = new FieldObserver({
        observed: ['#txt-box', '#select-single', '#radio-box'], // observed fields (mandatory)
        infoField: '#observer-info', // status field refernce, defaults to '#observer-info'
        infoText: 'filter(s) set' // string appended to number of filled fields, defaults to 'fields filled'
    });
    
3.) If you need to add fields dynamically to the observer, use:
    
    fieldObserver.addField('#txt-box2');
    
Example:
---------------
See the following jsFiddle for an example:

http://jsfiddle.net/Moonbird_IT/2Na5Y/



