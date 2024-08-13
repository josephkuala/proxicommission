pipeline {
    agent {
        docker {
            image 'josephkuala/devopsemrg-javajenkins-agent:latest'
            label 'devopsemrg-java-agent'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        DOCKER_IMAGE = "proxicommission"
        DOCKER_TAG = "latest"
        CONTAINER_NAME = "Api-Proxicom"
        PORT_MAPPING = "3000:3000"
        RESTART_POLICY = "always"
        RUNTIME_MODE = "privileged"
        NETWORK_MODE = "default_default"
    }

    triggers {
        pollSCM '*/5 * * * *'
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone your repository which contains the Dockerfile
                git credentialsId: 'github-creds', url: 'https://github.com/josephkuala/proxicommission.git'
            }
        }

        stage('Check and Remove Old Container') {
            steps {
                script {
                    // Check and remove the old Docker container if it exists
                    sh """
                        if [ \$(docker ps -a -f name=${CONTAINER_NAME} --format '{{.Names}}') = "${CONTAINER_NAME}" ]; then
                            docker rm -f ${CONTAINER_NAME}
                        fi
                    """
                }
            }
        }

        stage('Check and Remove Old Docker Image') {
            steps {
                script {
                    // Check and remove the old Docker image if it exists
                    sh """
                        if docker images -q ${DOCKER_IMAGE}:${DOCKER_TAG}; then
                            docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG}
                        fi
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image from the Dockerfile
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Create and Run Container') {
            steps {
                script {
                    // Create and run the container with the specified configurations
                    sh """
                        docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${PORT_MAPPING} \
                        --restart=${RESTART_POLICY} \
                        --runtime=${RUNTIME_MODE} \
                        --network=${NETWORK_MODE} \
                        ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
            }
        }
    }
    
    post {
        always {
            // Clean up any workspace files
            cleanWs()
        }
    }
}
