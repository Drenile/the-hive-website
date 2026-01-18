# the-hive-website (Backend)
---
1.) we will be using Javascript and the Express framework, i looked into it and thought it would be best but its still up for discussion depending on what we are more proficient with. 
Read briefly here if unfamilar: [More Info](http://medium.com/@seangray.dev/express-vs-django-a-comparative-guide-7dc85ee624b2

Javascript---> nest.js--->express.js--->database--->Server that handles APIs
more on api:[more api](https://aws.amazon.com/what-is/api/)
---
2.) For Databasing PostgreSQL i propose the tables 
Users, Posts, events, projects, applications
Users- who is using the site columns will include (id, email, name, role, created at)
Posts- Powers updates and annoucements (id, title, content, image_url, author_id, created_at)
Events- Stores upcoming or past events (id, title, description, date, location, image_url, created_at)
Projects- Powers projects and initiatives page (id, title, description, status, image_url, created_at)
Applications- stores forms for submission (id, user_id, project_id, message, status, created_at)
---
3.)API (door for frontend to reach backend)
HTTP Methods- GET, POST, PUT, DELETE
all routes should start with- /api 
For user related routes example GET /api/users/me
for posts example- GET /api/posts
Create posts (admin): Post /api/posts
update posts (admin): PUT /api/posts/:id 
Delete posts (admin): DELETE /api/posts/:id
Get events: GET /api/events
Create events(admin): POST /api/events
Get projects: GET /api/projects
create projects (admin): POST /api/projects
submit applications: POST /api/applications
view applications(admin): GET /api/applications
Role-based access control
---

