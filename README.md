# csc340_assignment3
antihero-api 
## Installation

1. Clone the repository
```bash
git clone https://github.com/Yash-EG/csc340_assignment3.git
cd csc340_assignment3
```
2. Make sure you have the following installed:
   - Java 21
   - Maven

3. This project was generated using [Spring Initializr](https://start.spring.io) with the following dependencies:
   - Spring Web
   - Spring Data JPA
   - PostgreSQL Driver

4. Set up a PostgreSQL database on [Neon](https://neon.tech)
5. Configure `src/main/resources/application.properties` with your Neon connection string
6. Run the application: mvn spring-boot:run
7. API available at `http://localhost:8080`

## API Endpoints
### Get all antiheroes
`GET /antiheroes`

### Get antihero by ID
`GET /antiheroes/{id}`

### Add new antihero
`POST /antiheroes`
```json
{
  "name": "Johnny Silverhand",
  "description": "Rockerboy and terrorist who became a digital ghost",
  "universe": "Cyberpunk 2077",
  "weapon": "Malorian Arms 3516",
  "morality": "Chaotic Neutral"
}
```

### Update antihero
`PUT /antiheroes/{id}`
```json
{
  "name": "Johnny Silverhand",
  "description": "Rockerboy and terrorist who became a digital ghost",
  "universe": "Cyberpunk 2077",
  "weapon": "pistol",
  "morality": "Chaotic Neutral"
}
```

### Delete antihero
`DELETE /antiheroes/{id}`

### Get by universe
`GET /antiheroes/universe/{universe}`

**Example:** `GET /antiheroes/universe/God of War`

### Search by name
`GET /antiheroes/search?name={substring}`

**Example:** `GET /antiheroes/search?name=jo` returns Johnny and Joel

## Demo Video
https://uncg-my.sharepoint.com/:v:/g/personal/yrpatel_uncg_edu/IQDEzsHKIp0CRp7v0IA6MZ47AYi-t8v62evV_XZVkR4kjio?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=eRy2xG

# Assignment 4
## Demo Video for Assignment 4
https://uncg-my.sharepoint.com/:v:/g/personal/yrpatel_uncg_edu/IQBa2lvqF7HaRL77dltCnH_wAQGb9zdRl5dfLzqohycfMLc?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=hKW9ui