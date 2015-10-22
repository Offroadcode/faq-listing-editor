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
	* @method createRtePropertyEditorForItems
	* @param {array of faq.Models.FAQItem} items
	* @description Build a series of RTE property editors for each item, and add them to $scope.rteProperties;
	*/
	$scope.createRtePropertyEditorForItems = function(items) {
		if (items && items.length > 0) {
			items.forEach(function(item, index) {
				var newRteProperty = new faq.Models.RTEProperty({
					label: 'Answer',
					description: '',
					value: item.answer
				});
				$scope.rteProperties.push(newRteProperty);
			});
		}
	};

	/**
	* @method watchForRtePropertiesUpdates
	* @description Activates a $scope.$watch to listen for updates to the rteProperties in the property editors, and then update the answers accordingly.
	*/
	$scope.watchForRtePropertiesUpdates = function() {
		$scope.$watch('rteProperties', function () {
			$scope.handleRtePropertyEditorUpdate($scope.rteProperties);
		}, true);
	};

	/**
	* @method setVariables
	* @description Called by $scope.init(). Sets the initial state for any scope variables.
	*/
	$scope.setVariables = function() {
		$scope.rteProperties = [];
		var value = new faq.Models.FAQListing();
		if ($scope.model.value) {
			value = new faq.Models.FAQListing($scope.model.value);
		}
		// Ensure there is at least one FAQItem.
		if (value.items.length < 1) {
			var newItem = new faq.Models.FAQItem();
			value.items.push(newItem);
		}
		$scope.createRtePropertyEditorForItems(value.items);
		$scope.watchForRtePropertiesUpdates();
		$scope.model.value = value;
	};

	// Event Handler Methods /////////////////////////////////////////////////////

	/**
	* @method addItem
	* @description Adds a new FAQItem to the array of questions.
	*/
	$scope.addItem = function() {
		var newItem = new faq.Models.FAQItem();
		var newRteProperty = new faq.Models.RTEProperty({
			label: 'Answer',
			description: '',
			value: ''
		});
		$scope.model.value.items.push(newItem);
		$scope.rteProperties.push(newRteProperty);
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
	* @param {array of faq.Models.RTEProperty} properties
	* @description Updates the $scope.model.value with any changes to the answers via the property editors.
	*/
	$scope.handleRtePropertyEditorUpdate = function(properties) {
		if (properties && properties.length) {
			properties.forEach(function(property, index) {
				$scope.model.value.items[index].answer = property.value;
			});
		}
	};

	// Helper Methods ////////////////////////////////////////////////////////////

	// Call $scope.init() ////////////////////////////////////////////////////////

	$scope.init();

});
