
## Intro

HighRise catalog service

## Environment variable

| Name  | Description |
| -------------  | ------------- |
| GREATING_INTERVAL  | The time between which the user will not be welcomed in the room |
| SERVER_URL      | Url to the HR server  |
| REDIS_URL       | Url to Redis  |
| API_TOKEN       | - |
| ROOM_ID         | - |

## Deploing
1.Configure `.env`

2.Choose the next option:

```bash
# development
$ npm run migrate:dev
$ npm run start:dev

# production mode

$ npm run start:prod
```
