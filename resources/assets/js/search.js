const searchClient = algoliasearch('AXTY3FIAOU', '4546621310eecf69709b717188d9c72f');

  const search = instantsearch({
    indexName: 'priority-sdk',
    searchClient,
    searchFunction(helper) {
      const container = document.querySelector('#hits');
      container.style.display = helper.state.query === '' ? 'none' : '';

    helper.search();
    }
  });
  
  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: '#search-box',
      placeholder: 'Search APIs and SDKs'
    }),
  
    instantsearch.widgets.hits({
      container: '#hits',
      autofocus: false,
      templates: {
          empty: 'No results',
          item: `
          <a href="{{url}}#{{anchor}}"><h3> {{title}}</h3></a> 
          <p class="tag">  {{tags}} </p>
          <p> {{#helpers.snippet}}{ "attribute": "content", "highlightedTagName": "mark" }{{/helpers.snippet}} </p>
          `
      }
    }),
  
    instantsearch.widgets.configure({
      hitsPerPage: 5,
    })
  ]);


//   $(function() {

//     $("#search-panel").keyup(function() {
//         $("#hits").show();
//       })
//     //   }).
//     // focusout(function() {
//     //     setTimeout(function() {
//     //     $("#hits").toggleClass( 'hide');
//     //     }, 5000)
//     // });
// });

  search.start();