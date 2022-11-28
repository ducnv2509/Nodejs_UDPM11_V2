pipeline {
    agent any
    stages {
            stage('Pull code from git') {
                steps {
                      sh 'cd /u03/Nodejs_UDPM11_V2'
                      sh 'git config --global --add safe.directory /var/lib/jenkins/workspace/CD_Node'
                      sh 'git pull origin master'
                }
            }
           stage('Building Docker Image') {
                steps {
               sh 'docker build -t udpm11:lastest --force-rm -f Dockerfile .'
                    }
                }
			stage('Change tag') {
                steps {
               sh 'docker tag udpm11:lastest 20.189.112.68:9001/repository/udpm11_nodejs/udpm11:lastest'
                    }
                }
                stage('login to nexus repo') {
                steps {
               sh 'docker login 20.189.112.68:9001 -u admin -p admin'
                    }
                }
               
  	            stage('Push') {
                steps {
                       sh 'docker push 20.189.112.68:9001/repository/udpm11_nodejs/udpm11:lastest'
                }
            }	
			
				stage('Run Image to container') {
                steps {
               sh 'docker-compose up -d'
                    }
                }
            

        }
    }