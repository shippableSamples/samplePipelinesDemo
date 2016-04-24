# Deploy Visualization 
Shows visually the services being deployed in real time to different environments using Shippable pipelines

Works with [Box][1], a cron application.

To test this project, run multiple instances of [Box][1] on different environments.

#### Environment Variables Required:
 - MONGO_API_URL (this mlab.com api url as we use that as a remote db)

https://api.mlab.com/api/1/databases/[db]/collections/[collection]?apiKey=[key]

[1]:https://github.com/aye0aye/box
