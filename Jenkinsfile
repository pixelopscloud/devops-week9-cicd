pipeline {
    agent any

    environment {
        APP_NAME = "devops-week9-app"
        IMAGE_TAG = "devops-week9-app:${BUILD_NUMBER}"
        TEST_PORT = "4000"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies / building app...'
                sh 'node -v'
                sh 'echo "Build stage completed successfully"'
            }
        }

        stage('Test') {
            steps {
                echo 'Starting app in background and running test...'
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
                echo 'Packaging application...'
                sh 'tar -czf ${APP_NAME}.tar.gz app.js package.json'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t ${IMAGE_TAG} .'
            }
        }

    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs above.'
        }
    }
}
