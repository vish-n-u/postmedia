# Backend PostMedia App
This project is node.js back-end code for a PostMedia application built using Express and MongoDB .POSTMAN is used for
Integration testing using REST API's.

<br/>

## Features

>**Account creation**
- You can create an account  using Email .
- You will be provided a jsonwebtoken
 

>**Post creation**
- Only authenticated users can create a Post.

  >**Comment creation**
- Only authenticated users can create a Comment.
  

<br/>

## Dependencies
|npm modules|
|-|
|express|
|mongoose|
|jsonwebtoken|
|dotenv|
|bcryptjs|
|cors|


<br/>

## Getting Started

### Prerequisites

- Node.js and npm should be installed on your machine.

### Installation

1. Clone the repository:
  ```shell
git clone https://github.com/vish-n-u/postmediaBackend

2. Change into the project directory:
```shell
cd postmediaBackend
```

3. Install the dependencies:
```shell
npm install
```

4 .Start the development server:
```shell
node index.js
