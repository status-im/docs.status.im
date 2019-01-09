# Status - Access a Better Web, Anywhere

This repo hosts the code for both [status.im](https://status.im) on the `master` branch (which builds and serves through `gh-pages`), and [dev.status.im](https://dev.status.im) on the `develop` branch.

There is an `edit` button on each page, which will take you directly to the document you need to edit on the `develop` branch. Please make sure that any changes you make are against `develop`. The idea is that we can merge recklessly to `develop`, then anyone see if the changes look OK on `dev.status.im`. 

`master` is protected and only ever gets changed when merging develop (`git merge develop --ff`). This method makes for easy maintenance AND allows a larger group of people to push directly to `develop` and show their changes on the staging site when asking for review, which should smooth out and speed up the process considerably for everyone.

## Adding a New Page

If you want to add a page to specific section, rather than just edit an existing page, you'll need to make sure your new page appears on the sidebar and is accessible to everyone.

1. Add your page to `source/<your_section>/<your_file_here>.md`
2. In `source/_data/sidebars.yml` add the appropriate text to the appropriate place.
3. In `themes/navy/languages/en.yml` edit the sidebars section to make sure that your new text in `sidebars.yml` is rendered correctly.

## Testing locally

Make sure you have node.js installed first.

1. Open Terminal and navigate to the project root directory,
2. Run `npm install`,
3. We share common elements across our sites using submodules, so you'll need to get those too:
```bash
    git submodule update --init --recursive
    cd themes/navy/layout/partial/shared-partials
    git checkout master
    git pull
    cd ../../../../../
```
3. Run `./node_modules/.bin/gulp build`,
4. In another terminal, run `./node_modules/.bin/hexo serve`,
5. This prevents the need for any global installs, and will allow you to have live reloading for any changes you are making.

## Contributing More

1. If you would like add new styles, you can find all the `sass` files in `themes/navy/source/scss` - add your own there and keep things modular, clean and performing well.
2. If you would like to add some JS for animations of images, or other potential bounties, the place to do that is `themes/navy/source/js`.
3. Changing the header, footer, mobile nav, or scripts (in `after_footer`) can be done in `themes/navy/layout/partial`.
4. Each new subdirectory gets it's own route, so if you want to add a new section like `status.im/extensions` or `status.im/contribute`, then just create a new directory in `source`, name it what you want the route to be called, and add an `index.md` file to it. 

If you want it to have a unique layout, set it up something like this:

```
---
layout: extensions
title: Status Extensions
id: index
---
```

and then create the appropriate `extensions.swig` layout file in `themes/navy/layout`. `.swig` files are _exactly_ like html - so just write html in there and don't stress.

Unfortunately, adding subdirectories within subdirectories like `status.im/security/guides` doesn't really work right now if you want to have a sidebar too, because it routes you to the wrong place. This could be the subject of a bounty.

## Search Cluster

For providing search an [ElasticSearch](https://www.elastic.co/products/elasticsearch) cluster is used, which is available at https://search.status.im/.

For more information see our [article on the Search Cluster](https://github.com/status-im/infra-docs/blob/master/articles/search_cluster.md).
