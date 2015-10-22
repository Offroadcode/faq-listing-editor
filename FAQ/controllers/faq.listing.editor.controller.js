angular.module("umbraco").controller("faq.listing.editor.controller", function($scope) {

	// Initialization Methods ////////////////////////////////////////////////////

	/**
	* @method init
	* @description Triggered on the controller loaded, kicks off any initialization functions.
	*/
	$scope.init = function() {
		$scope.setVariables();
	};

	/**
	* @method createPropertyEditorsForItems
	* @param {array of faq.Models.FAQItem} items
	* @description Build a series of RTE property editors for each item, and add them to $scope.rteProperties;
	*/
	$scope.createPropertyEditorsForItems = function(items) {
		if (items && items.length > 0) {
			items.forEach(function(item, index) {
				var newRteProperty = new faq.Models.UmbracoProperty({
					label: 'Answer',
					description: '',
					value: item.answer
				});
				var newTagProperty = new faq.Models.UmbracoProperty({
					label: 'Categories',
					description: '',
					value: item.categories,
					view: 'tags'
				});
				$scope.rteProperties.push(newRteProperty);
				$scope.tagProperties.push(newTagProperty);
			});
		}
	};

	/**
	* @method watchForPropertyUpdates
	* @description Activates a $scope.$watch to listen for updates to the rteProperties in the property editors, and then update the answers accordingly.
	*/
	$scope.watchForPropertyUpdates = function() {
		$scope.$watch('rteProperties', function () {
			$scope.handleRtePropertyEditorUpdate($scope.rteProperties);
		}, true);
		$scope.$watch('tagProperties', function () {
			$scope.handleTagPropertyEditorUpdate($scope.tagProperties);
		}, true);
	};

	/**
	* @method setVariables
	* @description Called by $scope.init(). Sets the initial state for any scope variables.
	*/
	$scope.setVariables = function() {
		$scope.rteProperties = [];
		$scope.tagProperties = [];
		var value = new faq.Models.FAQListing();
		if ($scope.model.value) {
			value = new faq.Models.FAQListing($scope.model.value);
		}
		// Ensure there is at least one FAQItem.
		if (value.items.length < 1) {
			var newItem = new faq.Models.FAQItem();
			value.items.push(newItem);
		}
		$scope.createPropertyEditorsForItems(value.items);
		$scope.watchForPropertyUpdates();
		$scope.model.value = value;
	};

	// Event Handler Methods /////////////////////////////////////////////////////

	/**
	* @method addItem
	* @description Adds a new FAQItem to the array of questions.
	*/
	$scope.addItem = function() {
		var newItem = new faq.Models.FAQItem();
		var newRteProperty = new faq.Models.UmbracoProperty({
			label: 'Answer',
			description: '',
			value: ''
		});
		var newTagProperty = new faq.Models.UmbracoProperty({
			label: 'Categories',
			description: '',
			value: '',
			view: 'tags'
		});
		$scope.model.value.items.push(newItem);
		$scope.rteProperties.push(newRteProperty);
		$scope.tagProperties.push(newTagProperty);
	};

	/**
	* @method deleteItem
	* @param {integer} index - The index (zero-based) of the item to delete from the question array.
	* @description Deletes a FAQItem from the array of questions.
	*/
	$scope.deleteItem = function(index) {
		$scope.model.value.items.splice(index, 1);
	};

	/**
	* @method handleRtePropertyEditorUpdate
	* @param {array of faq.Models.Umbraco} properties
	* @description Updates the $scope.model.value with any changes to the answers via the property editors.
	*/
	$scope.handleRtePropertyEditorUpdate = function(properties) {
		if (properties && properties.length) {
			properties.forEach(function(property, index) {
				$scope.model.value.items[index].answer = property.value;
			});
		}
	};

	/**
	* @method handleTagPropertyEditorUpdate
	* @param {array of faq.Models.Umbraco} properties
	* @description Updates the $scope.model.value with any changes to the categories via the property editors.
	*/
	$scope.handleTagPropertyEditorUpdate = function(properties) {
		if (properties && properties.length) {
			properties.forEach(function(property, index) {
				$scope.model.value.items[index].categories = property.value;
			});
		}
	};

	// Helper Methods ////////////////////////////////////////////////////////////

	// Call $scope.init() ////////////////////////////////////////////////////////

	$scope.init();

});
