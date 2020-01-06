---
id: first_pr_guide
title: Your First PR
---

# A Quick and Dirty Guide to Your First PR

## What is this?

So, you've found something on Status you want to work on.  Maybe it's a bug in the code, one of the existing issues from the issue tracker, or just an idea you have to make Status better.

This will get you up and running on your first PR.  It assumes you are working on the Android app.

### Prerequisites

- Linux: `git`, `curl`, and `make`
  - Run `sudo apt install -y git curl make` on the terminal

### 1. Fork the repository

Fork the repository on [Github](https://www.github.com) and then clone the repo.

```bash
git clone https://github.com/your_user_name/status-react.git
cd status-react
git remote add upstream https://github.com/status-react/status-react.git
git fetch upstream
```

### 2. Create your branch

Create your branch off the `develop` branch of the `status-react` repo.

```bash
git checkout -b my_example_status_branch -t upstream/develop
```

### 3. Get the environment ready

Depending on which environment you want to build for (Android/iOS/Desktop), there are different build targets to leverage.  Update the target OS defined below based on your intended build environment.

```bash
make shell TARGET=android
```

Follow the more detailed walkthroughs in the below links to get up and running with the end-to-end build process for each environment.

- [General build walthrough](./index.html)
- [iOS](./status_react_quickstart.html)
- [Desktop](./intro_desktop.html)

### 4. Code your changes

Make whatever changes to the app you've got in mind in your local branch.

### 5. Run tests

Run the linter to fix any formatting errors:

```bash
make lint-fix
```

In a second terminal window, run the tests with `sudo make test-auto`.  This will run the tests continually in the background.

### 6. Rebase and submit your PR

Once all the tests pass, rebase against the  `status-react/develop` branch.

```bash
git fetch upstream && rebase upstream/develop
```

Resolve any conflicts, stage and commit your branch.

```bash
git add .
git commit -m "My code works!"
```

Push your branch to Github with `git push`, and then submit your PR on the `status-react/develop` branch.  Fill out the form following the PR template.

Tip: If you're not done with your PR after your initial commit, make sure you put WIP in the title upon initial submission so the Status_Bot knows you still have work to do.

### 7. Continuous Integration

Navigate to the Github page that contains your PR.  Status's continuous integration tool, Jenkins, will run a number of automated tests and provide feedback on any issues that are identified.  Make further changes as needed based on the output provided by Jenkins.

Once all the CI tests pass, remove WIP from your PR's title and then work with any feedback provided by the reviewers.

Congrats, your first PR is well on it's way!
