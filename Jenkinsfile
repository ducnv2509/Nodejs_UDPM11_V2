pipeline {
    agent any
    stages {
            stage('Pull code from git') {
                steps {
                      sh 'cd /u02/Nodejs_UDPM11_V2'
                      sh 'git config --global --add safe.directory /var/lib/jenkins/workspace/CD'
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
               sh 'docker tag udpm11:lastest 180.93.175.236:9001/repository/cdudpm11/udpm11:lastest'
                    }
                }
                stage('login to nexus repo') {
                steps {
               sh 'docker login 180.93.175.236:9001 -u admin -p admin'
                    }
                }
               
  	            stage('Push') {
                steps {
                       sh 'docker push 180.93.175.236:9001/repository/cdudpm11/udpm11:lastest'
                }
            }	
			
				stage('Run Image to container') {
                steps {
               sh 'docker-compose up -d'
                    }
                }
            

        }
    }