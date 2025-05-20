Request URL:
https://pickballmatch-rgnc27zhh-pickleball-matchs-projects.vercel.app/api/trpc/profiles.getCurrent?batch=1&input=%7B%7D
Request Method:
GET
Status Code:
200 OK
Remote Address:
64.29.17.129:443
Referrer Policy:
strict-origin-when-cross-origin

response: 
[
    {
        "result": {
            "data": {
                "json": {
                    "user": {
                        "id": "user_2x0FVBRy2PqZ6RUn8hHz07IKCWo",
                        "email": "jpmiles86@gmail.com",
                        "firstName": "J.P.",
                        "lastName": "M",
                        "profileImageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yeDBGVkRFNlFZR0FzalJmVW40Rm1ZMFNoeDYifQ",
                        "age": null,
                        "gender": null,
                        "locationCoordinates": null,
                        "lastActive": null,
                        "createdAt": "2025-05-14T19:37:04.981Z",
                        "updatedAt": "2025-05-20T17:51:43.269Z"
                    },
                    "playerProfile": {
                        "id": "906910a3-e173-42b3-9bc3-01569e34c9ab",
                        "userId": "user_2x0FVBRy2PqZ6RUn8hHz07IKCWo",
                        "skillLevel": "3.5",
                        "preferredPlayStyle": "any",
                        "yearsPlaying": 0,
                        "preferredLocation": "Pura Pickleball",
                        "bio": "i rock",
                        "availability": null,
                        "maxTravelDistance": 0,
                        "isAvailableToPlay": true,
                        "videoIntroUrl": null,
                        "gameplayVideos": [],
                        "equipmentIds": [],
                        "strengths": [],
                        "weaknesses": [],
                        "playingFrequency": "occasionally",
                        "preferredTimes": null,
                        "travelWillingness": false,
                        "matchTypes": [],
                        "duprId": null,
                        "primaryPaddleId": null,
                        "updatedAt": "2025-05-20T16:26:59.023Z"
                    }
                }
            }
        }
    }
]

and next call, actually this next call was the first call, there seem to be two calls there for some reason, 

Request URL:
https://pickballmatch-rgnc27zhh-pickleball-matchs-projects.vercel.app/api/trpc/profiles.getCurrent?batch=1&input=%7B%7D
Request Method:
GET
Status Code:
200 OK
Remote Address:
64.29.17.129:443
Referrer Policy:
strict-origin-when-cross-origin


response: [
    {
        "result": {
            "data": {
                "json": {
                    "user": {
                        "id": "user_2x0FVBRy2PqZ6RUn8hHz07IKCWo",
                        "email": "jpmiles86@gmail.com",
                        "firstName": "J.P.",
                        "lastName": "M",
                        "profileImageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yeDBGVkRFNlFZR0FzalJmVW40Rm1ZMFNoeDYifQ",
                        "age": null,
                        "gender": null,
                        "locationCoordinates": null,
                        "lastActive": null,
                        "createdAt": "2025-05-14T19:37:04.981Z",
                        "updatedAt": "2025-05-20T17:21:28.496Z"
                    },
                    "playerProfile": {
                        "id": "906910a3-e173-42b3-9bc3-01569e34c9ab",
                        "userId": "user_2x0FVBRy2PqZ6RUn8hHz07IKCWo",
                        "skillLevel": "3.5",
                        "preferredPlayStyle": "any",
                        "yearsPlaying": 0,
                        "preferredLocation": "Pura Pickleball",
                        "bio": "i rock",
                        "availability": null,
                        "maxTravelDistance": 0,
                        "isAvailableToPlay": true,
                        "videoIntroUrl": null,
                        "gameplayVideos": [],
                        "equipmentIds": [],
                        "strengths": [],
                        "weaknesses": [],
                        "playingFrequency": "occasionally",
                        "preferredTimes": null,
                        "travelWillingness": false,
                        "matchTypes": [],
                        "duprId": null,
                        "primaryPaddleId": null,
                        "updatedAt": "2025-05-20T16:26:59.023Z"
                    }
                }
            }
        }
    }
]

and failed edit request:

Request URL:
https://pickballmatch-rgnc27zhh-pickleball-matchs-projects.vercel.app/api/trpc/profiles.updatePlayerProfile?batch=1
Request Method:
POST
Status Code:
400 Bad Request
Remote Address:
216.198.79.65:443
Referrer Policy:
strict-origin-when-cross-origin

payload:


0
: 
{skillLevel: "3.5", preferredPlayStyle: null, yearsPlaying: 10, preferredLocation: null, bio: null,…}
bio
: 
null
isAvailableToPlay
: 
true
maxTravelDistance
: 
0
playingFrequency
: 
null
preferredLocation
: 
null
preferredPlayStyle
: 
null
skillLevel
: 
"3.5"
strengths
: 
[]
weaknesses
: 
[]
yearsPlaying
: 
10


response:

[
    {
        "error": {
            "json": {
                "message": "[\n  {\n    \"code\": \"invalid_type\",\n    \"expected\": \"object\",\n    \"received\": \"undefined\",\n    \"path\": [],\n    \"message\": \"Required\"\n  }\n]",
                "code": -32600,
                "data": {
                    "code": "BAD_REQUEST",
                    "httpStatus": 400,
                    "path": "profiles.updatePlayerProfile",
                    "zodError": {
                        "formErrors": [
                            "Required"
                        ],
                        "fieldErrors": {}
                    },
                    "message": "[\n  {\n    \"code\": \"invalid_type\",\n    \"expected\": \"object\",\n    \"received\": \"undefined\",\n    \"path\": [],\n    \"message\": \"Required\"\n  }\n]"
                }
            }
        }
    }
]