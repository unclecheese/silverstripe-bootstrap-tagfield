# Bootstrap Tag Field for SilverStripe
Creates a field that allows multiple selection, like a CheckboxSetField to store in a `many_many`, `has_many`, or native field (as comma separated values) and provides **typeahead** searching with **prefetching** and **caching** on a given result set. Useful for multiple selection of a densely populated data set, like tags.

This field is only for frontend forms using the Bootstrap framework. It will not render properly in the CMS.

## Screenshot

![screenshot](https://cloud.githubusercontent.com/assets/654636/5621984/0406af24-95a1-11e4-9c61-0b25f7899dc3.png)
## Maintainers

 * Andre Lohmann (Nickname: andrelohmann)
  <lohmann dot andre at googlemail dot com>

## Usage

A simple tag field that queries against a list of all `Tag` records.
```php
BootstrapTagField::create('Tags', 'Add some tags below', Tag::get());
```

This field is not only for tags. It can be used as a replacement for checkboxes when the data set is large.
```php
BootstrapTagField::create(
  'Categories', 
  'Add categories to your product', 
  ProductCategory::get()
    ->filter('Available', true)
);
```

### Optional arguments

Set the field to be used as the label (e.g. the text of a checkbox field). Defaults to `Title`.
```php
BootstrapTagField::create('Tags', 'Add some tags below', Tag::get(), 'Name');
```

Set the field to be used as the ID of the option (e.g. the value that is stored in the database). Defaults to `ID`.
```php
BootstrapTagField::create('Tags', 'Add some tags below', Tag::get(), 'Name', 'Slug');
```

### Prefetching

You can optionally provide a `SS_List` to be loaded into the typeahead search to give immediate results. Once an actual query is made to the remote, the list is backfilled with any new results that come through.

Prefetch a list of popular tags:
```php
BootstrapTagField::create('Tags', 'Add some tags below', Tag::get())
    ->setPrefetch(
        Tag::get()
            ->leftJoin('Post_Tags', 'TagID = Tag.ID')                            
            ->sort('COUNT(Tag.ID)','DESC')
            ->limit(30)
            ->alterDataQuery(function($query) {
                $query->groupby('Tag.ID');
            })
    )
```
