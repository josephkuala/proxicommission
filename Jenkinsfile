pipeline {
    agent any

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
                git branch: 'main', url: 'https://github.com/josephkuala/proxicommission.git'
            }
        }

        
        stage('Check and Remove Old Docker Container') {
            steps {
                script {
                    def container_name = sh(
                        script: 'docker ps -a -f name=${CONTAINER_NAME} --format "{{.Names}}"',
                        returnStdout: true
                    ).trim()
                    
                    if (container_name == "${CONTAINER_NAME}") {
                        echo "Container Api-Proxicom exists."
                        // Add commands to stop and remove the container if needed
                    } else {
                        echo "Container Api-Proxicom does not exist."
                    }
                }
            }
        }

        stage('Check and Remove Old Docker Image') {
            steps {
                script {
                    def image_id = sh(
                        script: 'docker images -q ${DOCKER_IMAGE}',
                        returnStdout: true
                    ).trim()
                    
                    if (image_id) {
                        sh 'docker rmi ${DOCKER_IMAGE}'
                    } else {
                        echo "Image proxicommission:latest does not exist."
                    }
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
                        --${RUNTIME_MODE} \
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
