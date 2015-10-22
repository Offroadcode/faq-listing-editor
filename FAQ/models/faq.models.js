(function(models, undefined) {

	/**
	* @class FAQListing
	* @this FAQListing
	* @param {JSON} data
	* @param {optional array of FAQItem} data.items
	* @param {optional array of string} data.categories
	* @description Class defining a FAQ listing, which possesses multiple FAQ items and a list of categories.
	*/
	models.FAQListing = function(data) {
		var self = this;
		self.items = [];
		self.categories = [];
		if (data !== undefined) {
			if (data.items !== undefined) {
				if (data.items.length > 0) {
					self.items = data.items.map(function(item) {
						return new faq.Models.FAQItem(item);
					});
				}
			}
			if (data.categories !== undefined) {
				self.categories = data.categories;
			}
		}
	};

	/**
	* @class FAQItem
	* @this FAQItem
	* @param {JSON} data
	* @param {optional string} data.question
	* @param {optional string} data.answer
	* @param {optional string} data.categories - A comma seperated list
	* @description Class defining a FAQ item, which possess a question, an answer, and potentially a list of categories to which it belongs.
	*/
	models.FAQItem = function(data) {
		var self = this;
		self.question = '';
		self.answer = '';
		self.categories = '';
		if (data !== undefined) {
			if (data.question !== undefined) {
				self.question = data.question;
			}
			if (data.answer !== undefined) {
				self.answer = data.answer;
			}
			if (data.categories !== undefined) {
				self.categories = data.categories;
			}
		}
	};

	/**
	* @class UmbracoProperty
	* @class UmbracoProperty
	* @param {JSON} data
	* @param {string} data.label
	* @param {string} data.description;
	* @param {string} data.view;
	* @param {JSON} data.config
	* @param {faq.Models.RTEPropertyEditorConfig} data.config.editor
	* @param {string} data.value
	* @description A Class representing the data needed to create a Umbraco Property Editor.
	*/
	models.UmbracoProperty = function(data) {
		var self = this;
		self.label = 'bodyText';
		self.description = 'Load some stuff here';
		self.view = 'rte';
		self.validation = {
			mandatory: false
		};
		self.value = '';
		if (data !== undefined) {
			if (data.label !== undefined) {
				self.label = data.label;
			}
			if (data.description !== undefined) {
				self.description = data.description;
			}
			if (data.view !== undefined) {
				self.view = data.view;
			}
			if (data.view === 'rte' || data.view === undefined) {
				// If no view defined, it's a RTE by default, so add default RTE editor config.
				self.config = {
					editor: new faq.Models.RTEPropertyEditorConfig()
				};
			} else if (data.view === 'tags') {
				self.config = {
					group: 'faq',
					storageType: 'Json'
				};
			}
			if (data.config !== undefined) {
				if (data.config.editor !== undefined) {
					self.config = {
						editor: new faq.Models.RTEPropertyEditorConfig(data.config.editor)
					};
				} else {
					self.config = data.config;
				}
			}
			if (data.value !== undefined) {
				self.value = data.value;
			}
		}
	};

	/**
	* @class RTEPropertyEditorConfig
	* @class RTEPropertyEditorConfig
	* @param {JSON} data
	* @param {array of string} data.toolbar
	* @param {array of string} data.stylesheets
	* @param {{height: integer, width: integer}} data.dimensions
	* @description A class representing configuration options for an Umbraco RT Property Editor.
	*/
	models.RTEPropertyEditorConfig = function(data) {
		var self = this;
		self.toolbar = ["code", "undo", "redo", "cut", "styleselect", "bold", "italic", "alignleft", "aligncenter", "alignright", "bullist", "numlist", "link", "umbmediapicker", "umbmacro", "table", "umbembeddialog"];
		self.stylesheets = [];
		self.dimensions = {
			height: 400,
			width: 600
		};
		if (data !== undefined) {
			if (data.toolbar !== undefined) {
				self.toolbar = data.toolbar;
			}
			if (data.stylesheets !== undefined) {
				self.stylesheets = data.stylesheets;
			}
			if (data.dimensions !== undefined) {
				self.dimensions = {
					height: data.dimensions.height,
					width: data.dimensions.width
				};
			}
		}
	};

}(window.faq.Models = window.faq.Models || {}));
