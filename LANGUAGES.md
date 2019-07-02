# Description

This document describes how to add new languages.

# Process

Lets say that we want to add a new Armenian translation of the page.

0. Figure out the right __2-lettter ISO-639-1 code__:
  - https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
  - Details: https://hexo.io/docs/configuration.html
1. Create a new translation file:
  - `themes/navy/languages/hy.yml`
2. Update the list and names of languages in:
  - `source/_data/languages.yml`
3. Add the new language to the `language` list in both:
  - `_config.dev.yml` and
  - `_config.prod.yml`
4. Build the project using `yarn run build`
  - __Verify you see no templating errors.__
