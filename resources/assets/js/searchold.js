// const searchClient = algoliasearch('AXTY3FIAOU', '4546621310eecf69709b717188d9c72f');
import { hitTemplate } from "./helpers";

const search = instantsearch({
  appId: "AXTY3FIAOU",
  apiKey: "aadef574be1f9252bb48d4546621310eecf69709b717188d9c72f4ea09b5cfe5",
  indexName: "priority-sdk",
  searchParameters: {
    hitsPerPage: 3,
    attributesToSnippet: ["content:14"],
    snippetEllipsisText: " [...]"
  }
});

search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      empty: "No results found.",
      item(hit) {
        return hitTemplate(hit);
      }
    }
  }))

// const search = instantsearch({
//   indexName: 'priority-sdk',
//   searchClient, 
// });

search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    placeholder: "Search articles",
    autofocus: false
  })
);

// search.addWidgets([
//   instantsearch.widgets.searchBox({
//     container: '#searchbox',
//     placeholder: 'Search APIs and SDKs'
//   }),

//   instantsearch.widgets.hits({
//     container: '#hits',
//     templates: {
//         empty: 'No results',
//         item: ` 
//         <div class="hit-name">
//            <h3>{ "attribute": "title" }</h3>
//         </div>
//         <div class="hit-description">
//           {{#helpers.highlight}}{ "attribute": "content" }{{/helpers.highlight}}
//         </div>
//         `,
//     }
//   }),

//   // instantsearch.widgets.configure({
//   //   hitsPerPage: 8
//   // })
// ]);

search.start();

