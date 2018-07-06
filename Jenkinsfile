node('linux') {
  stage('Git Prep') {
    checkout scm
    sh 'git config user.name "status-im-auto"'
    sh 'git config user.email "auto@status.im"'
  }

  stage('Install Deps') {
    sh 'cd website && npm install'
  }

  stage('Publish') {
    withCredentials([string(
      credentialsId: 'jenkins-github-token',
      variable: 'GITHUB_TOKEN',
    )]) {
      sh 'cd website && GIT_USER="status-im-auto:$GITHUB_TOKEN" npm run publish-gh-pages'
    }
  }
}
