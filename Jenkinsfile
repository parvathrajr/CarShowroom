pipeline {
    agent any

    environment {
        IMAGE_NAME = 'luxora-motors'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Build image') {
            steps {
                bat 'docker build -t %IMAGE_NAME%:%IMAGE_TAG% -t %IMAGE_NAME%:latest .'
            }
        }

        stage('Smoke test') {
            steps {
                bat 'docker rm -f luxora-motors-test 2>NUL || ver >NUL'
                bat 'docker run -d --name luxora-motors-test -p 5001:5000 %IMAGE_NAME%:%IMAGE_TAG%'
                bat 'powershell -NoProfile -Command "for ($i = 0; $i -lt 30; $i++) { try { $response = Invoke-WebRequest -UseBasicParsing http://localhost:5001/api/health; if ($response.StatusCode -eq 200) { exit 0 } } catch {}; Start-Sleep -Seconds 2 }; exit 1"'
            }
        }
    }

    post {
        always {
            bat 'docker logs luxora-motors-test 2>NUL || ver >NUL'
            bat 'docker rm -f luxora-motors-test 2>NUL || ver >NUL'
        }
    }
}