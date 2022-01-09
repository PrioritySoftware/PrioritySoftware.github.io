const searchClient = algoliasearch('AXTY3FIAOU', '4546621310eecf69709b717188d9c72f');

const search = instantsearch({
  indexName: 'priority-sdk',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Search APIs and SDKs'
  }),

  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
        empty: 'No results',
        item: '
        <h3>
            {{ __hitIndex }}:
            {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
         </h2>
        <p> {{{content.value}}} </p>
        ',
    }
  }),

  instantsearch.widgets.configure({
    hitsPerPage: 8
  })
]);

// search.start();