## Status Technikon

To run the site locally, follow these instructions;

```bash
git clone https://github.com/status-im/docs.status.im.git
cd docs.status.im
cd website/
npm install
npm run start
```

This site is built with [Docusaurus](https://docusaurus.io/), go there to learn more.

All you really need to do is add an MD file in `/docs` and then reference it correctly in `website/sidebars.json` in the sidebar of your choice. There are some subtleties with versioning and translations which will be documented here at a later stage.

## Continous Deployment

To make possible deploying the new version of the page from the `master` branch a Jenkins job is configured at:

https://jenkins.status.im/job/misc/job/docs.status.im/

This job is ran according to the [`Jenkinsfile`](Jenkinsfile) configuration.
In order for this to work there are two requirements:

* The `status-im-auto` user which API token is used needs to have at least write access.
* The repo has to have the https://jenkins.status.im/github-webhook/ webhook configured.
