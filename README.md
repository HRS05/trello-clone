# Trello-clone

## Problem Statement 
Create clone of Trello implement following features :  
1. Provide the registration and login feature to the user.
2. After login or registration serve the details of projects to the user.
3. Provide the feature of project creation.
4. Inside the project allow users to assign tasks to their collabration team members.
5. Provide the feature of task assigning and also manage the stage(backlog, ready, in progress and done) of task.

## Approach 

### Resources used
* Used Express.js as backend server.
* Mongo DB as Database which is hosted on cloud (Mongodb atlas).
* Used proper MVC pattern for development.
* Also used proper Authentication using JWT token.

### Schema Design
Created three tables for solving the problem :   
1. userDeatilsModel
2. projectInfoModel
3. taskInfoModel

Relation between all the tables :  
* userDeatilsModel and projectInfoModel have many - many relation because one user can be in many projects and one project can have many users.
* userDeatilsModel and taskInfoModel have one - many relation because one user can have many tasks but one task can belong to only one users.
* projectInfoModel and taskInfoModel have one - many relation because inside one project we have many tasks but one task can belong to only one project.

### Tables
```c
+---------------------------------+
|       userDetailslModel         |
+---------------------------------+
| _id(userId,Unique)              |
| name (String)                   |
| gender (String)                 |
| age (Number)                    |
| createdProject (Array)          |
| joinedProject  (Array)          |
| contactNumber  (String,Unique)  |
| emailId      (String,Unique)    |
| password     (String)           |
| companyId (Number)              |
| companyName (String)            |   
| timestamps                      |
+---------------------------------+

+---------------------------------+
|       projectInfoModel          |
+---------------------------------+
| _id(projectId,Unique)           |
| name (String)                   |
| description (String)            |
| creatorId (String)              |
| collaborators (Array)           |   
| timestamps                      |
+---------------------------------+

+---------------------------------+
|       taskInfoModel             |
+---------------------------------+
| _id(taskId,Unique)              |
| projectId (String)              |
| assigneedById (String)          |
| assigneedBy (String)            |
| likeInfo (Array)                |
| commentInfo  (Array)            |
| stage  (String)                 |
| assigneeId      (String)        |
| assignee     (String)           |
| descriptiom (String)            |
| dueDate (Date)                  |   
| timestamps                      |
+---------------------------------+

```
## API Decription

### Base URL
```
http://localhost:3000
```

### User Registration
```
/api/user/registerUser
```
* request type :- post 
* After registration, the response will contain jwt token and two arrays that contain information about created projects and joined projects of the user (both the array is empty in the registration case), now the user will divert to a page that shows cards of projects.

* Request Json : 
```
{
    "name" : "hasrh sharma",
    "gender" : "Male",
    "age" : "23",
    "contactNumber" : "7869102714",
    "emailId" : "harshjmhr@gmail.com",
    "password" : "1234567890",
    "companyId" : "11",
    "companyName" : "TRACKIER"
}
```

* Response Json : 
```
{
    "message": {
        "result": "User created ",
        "data": {
            "createdProject": [],
            "joinedProject": [],
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNiODZhMzIzNjkyMWM0NDU2NWVjZjk4IiwiZW1haWwiOiJoYXJzaHNoc0BnbWFpbC5jb20iLCJpYXQiOjE2NzMwMzAxOTQsImV4cCI6MTY3MzAzNzM5NH0.Q-AcjMJIb7gY6aUYqfroZWKGN-gJ2Dhx_UCMc78HGd8"
        }
    }
}
```

### User Login
```
/api/user/loginUser
```
* request type :- post 
* After login, the response will contain jwt token and two arrays that contain information about created projects and joined projects of the user, now the user will divert to a page that shows cards of projects.

* Request Json : 
```
{
    "emailId" : "harshjmhr@gmail.com",
    "password" : "1234567890"
}
```

* Response Json : 
```
{
    "message": {
        "result": "logged IN",
        "data": {
            "createdProject": [
                {
                    "projectId": "63b6d9ebec47054d54df434f",
                    "name": "first project",
                    "description": "checking my first project creation"
                }
            ],
            "joinedProject": [
                {
                    "projectId": "67e6d9ebec47054d54hd434f",
                    "name": "joined project",
                    "description": "checking my joined project creation",
                    "creatorId" : "67e6diduec47054d54hd434f"
                }
            ],
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNiNWQ3NWMxZWEwOTMwOThhYjNlNjk5IiwiZW1haWxJZCI6ImhhcnNoam1ockBnbWFpbC5jb20iLCJpYXQiOjE2NzMwMzA2NzYsImV4cCI6MTY3MzAzNzg3Nn0.LslmWNPKdZhn8L599yS1XGsXSw7mEoZqz35AJu0BPgc"
        }
    }
}
```

### Create Project
```
/api/project/createProject
```
* request type :- post 
* below API used to create a project for collaboration.

* Request Json : 
```
{
    "name" : "first project",
    "description" : "checking my first project creation",
    "creatorId" : "63b5d75c1ea093098ab3e699",
    "collaborators" : [
            {
                "memberId":"63b5dfb50131841dec96638f"
            },     
            {
                "memberId":"63b5dfdf0131841dec966393"
            },
            {
                "memberId" : "63b5dfef0131841dec966395"
            }
    ],
}
```

* Response Json : 
```
{
    "message": {
        "result": "project is created for collaboration"
    }
}
```

### Create Task
```
/api/task/createTask
```
* request type :- post 
* below API used to create tasks in the project for assigning to the user.

* Request Json : 
```
{
    "projectId" : "63b6dbb3ec47054d54df4363",
    "assigneedById" : "63b5d75c1ea093098ab3e699",
    "assigneedBy" : "Harsh Sharma",
    "stage" : "In Progress",
    "assigneeId" : "63b5dfb50131841dec96638f",
    "assignee" : "pankaj vyas",
    "dueDate" : "05-01-2023",
    "description" : "this is first task assiging"
}
```

* Response Json : 
```
{
    "message": {
        "result": "task assigneed"
    }
}
```

### Update Task
```
/api/task/updateTask
```
* request type :- post 
* below API used to update existing tasks in a project.
* using this API we can manage likes, comments, and other fields for particular tasks.

* Request Json : 
```
{
    "taskId" : "63b6ed239a8d9aab9941e17c",
    "projectId" : "63b6dbb3ec47054d54df4363",
    "assigneedById" : "63b5d75c1ea093098ab3e699",
    "assigneedBy" : "Harsh Sharma",
    "stage" : "In Progress",
    "assigneeId" : "63b5dfb50131841dec96638f",
    "assignee" : "pankaj vyas",
    "dueDate" : "05-01-2023",
    "description" : "this is first task assiging",
    "likeInfo" : [
        {
            "userId" : "63b5d75c1ea093098ab3e699",
            "username" : "jack"
        },
        {
            "userId" : "63b5dfb50131841dec96638f",
            "username" : "Sarthak"
        }
    ],
    "commentInfo" :  [
        {
            "userId" : "63b5d75c1ea093098ab3e699",
            "username" : "jack",
            "comment" : "hey"
        },
        {
            "userId" : "63b5dfb50131841dec96638f",
            "username" : "check 1",
            "comment" : "Sarthak"
        },
        {
            "userId" : "63b5d75c1ea093098ab3e699",
            "username" : "jack",
            "comment" : "hey"
        }
    ]

}
```

* Response Json : 
```
{
    "message": {
        "result": "task updated"
    }
}
```

### Get Tasks for project
```
api/task/getTasks
```
* request type :- post 
* when the user will click on a particular project so, this API will get called and in response, the contains an array of all tasks for that particular project.
* there are 4 arrays of tasks (backlog tasks, ready tasks, done tasks, and in-progress tasks) in response.

* Request Json : 
```
{
    "projectId" : "63b6dbb3ec47054d54df4363"
}
```

* Response Json : 
```
{
    "message": {
        "result": {
            "backlog": [],
            "inProgress": [
                {
                    "_id": "63b6ed239a8d9aab9941e17c",
                    "commentInfo": [
                        {
                            "userId": "63b5d75c1ea093098ab3e699",
                            "username": "jack",
                            "comment": "hey"
                        },
                        {
                            "userId": "63b5dfb50131841dec96638f",
                            "username": "Sarthak",
                            "comment": "hello"
                        },
                        {
                            "userId": "63b5d75c1ea093098ab3e699",
                            "username": "jack",
                            "comment": "hey"
                        }
                    ],
                    "likeInfo": [
                        {
                            "userId": "63b5d75c1ea093098ab3e699",
                            "username": "jack"
                        },
                        {
                            "userId": "63b5dfb50131841dec96638f",
                            "username": "Sarthak"
                        }
                    ],
                    "projectId": "63b6dbb3ec47054d54df4363",
                    "assigneedById": "63b5d75c1ea093098ab3e699",
                    "assigneedBy": "Harsh Sharma",
                    "stage": "In Progress",
                    "assigneeId": "63b5dfb50131841dec96638f",
                    "dueDate": "2023-04-30T18:30:00.000Z",
                    "description": "this is third task assiging",
                    "createdAt": "2023-01-05T15:30:43.782Z",
                    "updatedAt": "2023-01-06T07:02:47.910Z",
                    "__v": 2,
                    "assignee": "pankaj vyas"
                },
            ],
            "done": [],
            "ready": [
                {
                    "_id": "63b7208da02284b9f4fd4767",
                    "commentInfo": [],
                    "likeInfo": [],
                    "projectId": "63b6dbb3ec47054d54df4363",
                    "assigneedById": "63b5d75c1ea093098ab3e699",
                    "assigneedBy": "Harsh Sharma",
                    "stage": "Ready",
                    "assigneeId": "63b5dfb50131841dec96638f",
                    "dueDate": "2023-04-30T18:30:00.000Z",
                    "description": "this is second task assiging",
                    "createdAt": "2023-01-05T19:10:06.088Z",
                    "updatedAt": "2023-01-05T19:59:54.885Z",
                    "__v": 0
                }
            ]
        }
    }
}
```

### Change stage(backlog, ready, done and in progress) of task
```
/api/task/changeTaskStage
```
* request type :- post 
* when dragging a task from one stage to another stage happens on the UI side so, this API will use to update the task's stage in DB.

* Request Json : 
```
{
    "taskId" : "63b72093a02284b9f4fd476c",
    "newStage" : "Ready"
}
```

* Response Json : 
```
{
    "message": {
        "result": "Updated successfully"
    }
}
```

