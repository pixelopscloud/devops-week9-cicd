# DevOps Week 9 — CI/CD Pipeline with Jenkins & Docker

A simple Node.js (Express) application demonstrating a complete CI/CD pipeline built with Jenkins — covering automated build, test, packaging, and Docker image creation/deployment.

## Overview

This project was built as part of the DevOps Internship — Week 9: Advanced CI/CD & Deployment Strategies. It demonstrates how a CI/CD pipeline moves code from commit to deployment automatically, reducing manual errors and downtime.

**Pipeline Flow:**

GitHub -> Jenkins -> Build -> Test -> Package -> Docker Build -> Push -> Deploy

## Tech Stack

- Application: Node.js + Express
- CI/CD: Jenkins (Pipeline as Code via Jenkinsfile)
- Containerization: Docker
- Version Control: Git & GitHub
- Registry: Docker Hub

## Application Endpoints

| Method | Endpoint  | Description                                |
|--------|-----------|--------------------------------------------|
| GET    | /         | Welcome message with app status            |
| GET    | /health   | Health check (status, uptime, timestamp)   |
| GET    | /info     | App name, version, and environment info    |

## Project Structure

.
- app.js           Express application
- test.js          Automated tests for the app endpoints
- package.json     Project metadata & dependencies
- Dockerfile       Container build instructions
- Jenkinsfile      CI/CD pipeline definition
- .dockerignore
- .gitignore
- README.md

## Pipeline Stages

1. Checkout — Pulls the latest code from the GitHub repository.
2. Build — Installs Node.js dependencies (npm install).
3. Test — Runs automated tests against /, /health, and /info endpoints on a dedicated test port.
4. Package — Archives the application source into a .tar.gz artifact.
5. Docker Build — Builds a Docker image tagged with the Jenkins build number, and tags it as latest.

Environment variables (APP_NAME, IMAGE_TAG, TEST_PORT) are configured directly in the pipeline for consistency across runs.

## Running Locally

npm install
node app.js
curl http://localhost:3500/
curl http://localhost:3500/health
curl http://localhost:3500/info

## Running with Docker

docker build -t devops-week9-app .
docker run -d --name devops-week9-container -p 3500:3500 devops-week9-app
curl http://localhost:3500/

## Pulling from Docker Hub

docker pull pixelopscloud/devops-week9-app:latest
docker run -d -p 3500:3500 pixelopscloud/devops-week9-app:latest

## Setting Up the Jenkins Pipeline

1. Create a new Pipeline job in Jenkins.
2. Under Pipeline -> Definition, select Pipeline script from SCM.
3. Set SCM to Git and provide this repository's URL.
4. Set Branch Specifier to */main.
5. Leave Script Path as the default Jenkinsfile.
6. Save and click Build Now.

## Deployment Strategy Notes

- Rolling Deployment was used to replace the running container with a newer image version with minimal downtime.
- Rollback is handled by re-running the container with a previously built, known-good image tag.

## Author

Muhammad Ali — DevOps Internship, Week 9
