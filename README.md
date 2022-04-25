
## Code


##### To add/update query params
```
const url = new URL(window.location.href);
url.searchParams.set(query, value);                 // ?page=4 (here query = "page" and value = 4);
window.history.pushState({ path: url.href }, '', url.href);

```


##### To get the value of query params
```
const url = new URL(window.location.href);
const query_value =  url.searchParams.get(query);                 // ?page=4 (here query_value = 4);

```


##### To delete query params
```
const url = new URL(window.location.href);
url.searchParams.delete(query);                 // ?page=4 (here page and its value will be deleted);
window.history.pushState({ path: url.href }, '', url.href);

```
