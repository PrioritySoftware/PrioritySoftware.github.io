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
        item: ` 
        <div class="hit-name">
           <h3>{ "attribute": "title" }</h3>
        </div>
        <div class="hit-description">
          {{#helpers.highlight}}{ "attribute": "content" }{{/helpers.highlight}}
        </div>
        `,
    }
  }),

  // instantsearch.widgets.configure({
  //   hitsPerPage: 8
  // })
]);

search.start();

