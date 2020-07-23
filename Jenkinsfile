pipeline {
  agent { label 'linux' }

  options {
    disableConcurrentBuilds()
    /* manage how many builds we keep */
    buildDiscarder(logRotator(
      numToKeepStr: '20',
      daysToKeepStr: '30',
    ))
  }

  environment {
    SCP_OPTS = 'StrictHostKeyChecking=no'
    DEV_HOST = 'jenkins@node-01.do-ams3.proxy.misc.statusim.net'
    DEV_SITE = 'dev.status.im'
    GIT_USER = 'status-im-auto'
    GIT_MAIL = 'auto@status.im'
  }

  stages {
    stage('Git Prep') {
      steps {
        sh "git config user.name ${GIT_USER}"
        sh "git config user.email ${GIT_MAIL}"
      }
    }

    stage('Install Deps') {
      steps {
        sh 'yarn install'
      }
    }

    stage('Index') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'search.status.im-auth',
          usernameVariable: 'HEXO_ES_USER',
          passwordVariable: 'HEXO_ES_PASS'
        )]) {
          sh 'yarn run index'
        }
      }
    }

    stage('Build') {
      steps {
        sh 'yarn run clean'
        sh 'yarn run build'
      }
    }

    stage('Robot') {
      when { expression { !GIT_BRANCH.endsWith('master') } }
      steps { script {
        sh 'echo "Disallow: /" >> public/robots.txt'
      } }
    }

    stage('Publish Prod') {
      when { expression { GIT_BRANCH.endsWith('master') } }
      steps { script {
        sshagent(credentials: ['status-im-auto-ssh']) {
          sh 'yarn run deploy'
        }
      } }
    }

    stage('Publish Devel') {
      when { expression { !GIT_BRANCH.endsWith('master') } }
      steps { script {
        def site = DEV_SITE
        /* dev site for testing translations */
        if (GIT_BRANCH.endsWith('dev-lang')) {
           site = 'dev-lang.status.im'
        }
        sshagent(credentials: ['jenkins-ssh']) {
          sh """
            rsync -e 'ssh -o ${SCP_OPTS}' -r --delete \
              public/. ${DEV_HOST}:/var/www/${site}/
          """
        }
      } }
    }
  }
}
