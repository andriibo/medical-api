#!/bin/bash

export API_CONTAINER_ID=$(docker ps --filter name=medical-api-stage_medical-api -q)
echo ${API_CONTAINER_ID}
docker exec -it ${API_CONTAINER_ID} npm install
docker exec -it ${API_CONTAINER_ID} npm run migration:up
docker exec -it ${API_CONTAINER_ID} npm run test:e2e