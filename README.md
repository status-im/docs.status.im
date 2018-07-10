## Contributing

### Editing an existing page

All documentation is kept as markdown files in the `docs` folder. Simply locate the file you want, change it and create a Pull Request.
Once reviewed and merged your changes will be live.

### Adding a new page

Creating a new page requires you to:

* create a new markdown file in `docs` folder
* reference it somewhere (in the index, menu or another page)

It's probably a good idea to locally validate your changes before creating a Pull Request.

To run the site locally, follow these instructions;

```bash
git clone https://github.com/status-im/docs.status.im.git
cd docs.status.im
cd website/
npm install
npm run start
```

This site is built with [Docusaurus](https://docusaurus.io/), go there to learn more.

## Continous Deployment

To make possible deploying the new version of the page from the `master` branch a Jenkins job is configured at:

https://jenkins.status.im/job/misc/job/docs.status.im/

This job is run according to the [`Jenkinsfile`](Jenkinsfile) configuration.
In order for this to work there are two requirements:

* The `status-im-auto` user whose API token is used needs to have at least write access.
* The repo has to have the https://jenkins.status.im/github-webhook/ webhook configured.
