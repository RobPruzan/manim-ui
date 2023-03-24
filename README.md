# Web and GPT4 based Manim animation UI

Easily animate through the web with a gpt4 interface for manim
<img width="1315" alt="image" src="https://user-images.githubusercontent.com/97781863/227605416-16514ceb-9286-424e-8538-9d7a92a2149f.png">

## Setup

### Docker

```bash
cd manim_backend
docker build -t manim_flask . && docker run -d -p 8000:8000 --name manim_flask_container manim_flask
```

## NextJS

- Add database URL to .env- follow .env.example
  - Note, if you're not using postgres, change the database type in schema.prisma, though for now the DB is not neccesarry, the simplest option would be to use sqllite
- Add your open AI API and Org keys to .env- follow .env.example
- Specify the OpenAI model you want to use in .env - following .env.example

```bash
cd manim_ui
npx prisma db push
npm run dev
```
