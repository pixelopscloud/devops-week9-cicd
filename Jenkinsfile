pipeline {
    agent any

    environment {
        APP_NAME   = "devops-week9-app"
        IMAGE_TAG  = "devops-week9-app:${BUILD_NUMBER}"
        TEST_PORT  = "4000"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'node -v'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests on a temporary port...'
                sh '''
                    fuser -k ${TEST_PORT}/tcp || true
                    sleep 1
                    PORT=${TEST_PORT} node app.js &
                    SERVER_PID=$!
                    sleep 2
                    PORT=${TEST_PORT} node test.js
                    TEST_RESULT=$?
                    kill $SERVER_PID || true
                    exit $TEST_RESULT
                '''
            }
        }

        stage('Package') {
            steps {
                echo 'Packaging application artifacts...'
                sh 'tar -czf ${APP_NAME}.tar.gz app.js package.json'
                archiveArtifacts artifacts: '*.tar.gz', fingerprint: true
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t ${IMAGE_TAG} .'
                sh 'docker tag ${IMAGE_TAG} ${APP_NAME}:latest'
            }
        }

    }

    post {
        success {
            echo "Pipeline completed successfully. Image: ${IMAGE_TAG}"
        }
        failure {
            echo 'Pipeline failed. Check the stage logs above for details.'
        }
        always {
            echo 'Cleaning up temporary test processes if any remain...'
            sh 'fuser -k ${TEST_PORT}/tcp || true'
        }
    }
}
