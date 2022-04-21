
### Code

```
const url = new URL(window.location.href);
url.searchParams.set(query, value);                 // ?page=4 (here query = "page" and value = 4);
window.history.pushState({ path: url.href }, '', url.href);

```