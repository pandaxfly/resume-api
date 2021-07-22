# Yuehao's Resume Site

### Change Log
#### 2021-Jul-22
Completed one round of dry-run setting up EC2 t2.micro as k8s cluster, encountered severe performance issue since the cpu & memory specs does not meet the minimum requirement.

#### 2021-Jul-16
Making frontend and backend separate is a bit annoying and not cost effective, so I am planning to 
combine . Two things to do:
1. Combine the frontend with backend application, make it full stacked app.
2. Use Nginx to host and serve frontend.  

### Version History
#### Version 1.1
All technical assets are deployed on EC2 instances, using AWS as the infrastructure provider. 
- Added Nginx as a http server to store and host React frontend.

#### Version 1
The site has been migrated to AWS to support users in China region.   
- Frontend: using React and hosted in S3 using hosting service
- Backend: added contact API to store contact message information. The backend is based on NodeJs hosted in EC2 instances
- Database: Redis

#### Baseline (De-commissioned)
The baseline of the site is straight forward. The purpose is only to get the resume site ready, so I choose the fully managed GCP Paas services.
- Frontend: Cloud Storage to host frontend page
- Backend: Cloud Run to host api 
- Domain & Network: Google Domain and Cloud Load Balancing
- Service: Dialogflow, Cloud Vision