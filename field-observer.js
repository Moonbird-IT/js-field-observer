var FieldObserver = function (options) {
  /*
   * Version: 0.1
   * Date:	   2014-04-28
   */

  /* set up default options and reference to self */
  var self = this;
  self.options = {
    infoField: '#observer-info',
    infoText: 'fields filled',
    observed: []
  };
  self.arrFields = [];
  // combine custom and default options
  self.options = $.extend({}, self.options, options);

  /**
   * Refreshs the summary box and adds clearing functionality
   */
  self.refreshSummary = function () {
    var sum = 0;
    for (var key in self.arrFields) {
      sum += self.arrFields[key];
    }
    $(self.options.infoField).html(sum + ' ' + self.options.infoText);
    if (sum > 0) {
      $('<button>Clear</button>')
        .attr('id', self.options.infoField + '-clear')
        .appendTo($(self.options.infoField))
        .on('click', $.proxy(function () {
          this.resetFields();
        }, this));
    }
  }

  /**
   * resets one field
   */
  self.resetField = function (obj) {
    switch (obj.attr('type')) {
      case 'text':
      case 'password':
      case undefined:
        obj.val('');
        break;
      case 'checkbox':
      case 'radio':
        obj.attr('checked', false);
        break;
    }
  }

  /**
   * reset all fields
   */
  self.resetFields = function () {
    for (var field in self.arrFields) {
      var $obj = $('#' + field);
      self.resetField($obj);
      self.observeField($obj);

    }
  }

  /**
   * handle field changes
   */
  self.observeField = function (obj) {
    var elemId = obj.attr('id');

    switch (obj.attr('type')) {
      case 'text':
      case 'password':
        self.arrFields[elemId] = obj.val() != '' ? 1 : 0;
        break;
      case 'checkbox':
      case 'radio':
        self.arrFields[elemId] = obj.is(':checked') ? 1 : 0;
        break;
      case undefined:
        self.arrFields[elemId] = (obj.val() + '' != 'undefined' && obj.val() + '' != '') ? 1 : 0;
        break;
    }
    self.refreshSummary();
  }


  /**
   * add another field to the observer
   */
  self.addField = function (field) {
    var $objObserved = $(field);
    self.observeField($objObserved);
    $objObserved.on('change keyup', function () {
      self.observeField($(this));
    });
  }

  /**
   * initialise observer
   */
  self.init = function () {
    for (var i = 0; i < self.options.observed.length; i++) {
      if ($(self.options.observed[i]).length > 0) {
        // set up an event listener for the given field
        self.addField(self.options.observed[i]);
      }
    }
  }
  self.init();
}
