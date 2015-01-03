(function ($) {
	$(function () {		
		$('input[data-bootstrap-tags]').each(function () {
			var $el = $(this);
			var name = $el.attr('name');
			var vals = JSON.parse($el.attr('data-value') || '[]');
			var tags = new Bloodhound({
			  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('label'),
			  queryTokenizer: Bloodhound.tokenizers.whitespace,
			  prefetch: $el.attr('data-prefetch-url'),
			  remote: $el.attr('data-query-url')+'?q=%QUERY'
			});
			tags.initialize();

			$el.tagsinput({
			  itemValue: 'id',
			  itemText: 'label',
			  freeInput: $el.data('freeinput'),
			  typeaheadjs: {
			    name: 'tags',
			    displayKey: 'label',
			    source: tags.ttAdapter()
			  }
			});

			$el.on('beforeItemAdd', function (e) {
				if(typeof e.item === 'string') {
					var label = e.item;
					e.item = {
						label: label,
						id: '__new__'+$el.closest('form').find('[name^='+name+']').length
					}
				}
			});
			$el.on('itemAdded', function (e) {
				$el.after('<input type="hidden" name="'+name+'['+e.item.id+']" value="'+e.item.label+'">');
			})
			.on('itemRemoved', function (e) {
				$el.closest('form').find('[name="'+name+'['+e.item.id+']"]').remove();
			})
			.attr('name', name+'__tagsinput');
			for(var v in vals) {				
				$el.tagsinput('add', vals[v]);
			}
		})
	})
})(jQuery);