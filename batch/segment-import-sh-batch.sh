#!/bin/sh

# This script sends a batch import to Segment's batch API endpoint,
# taking your Segment writeKey as its first argument and the file
# name containing your batched, pre-formatted data a its second
#
# Example: ./import-script.sh <writeKey> batch.json

batch=$(cat $2)

response=$(curl -X POST https://api.segment.io/v1/batch -u "$1":"" -H "Accept: application/json" -H "Content-type: application/json" -d "$batch")

success="$response" | grep "success"

if [ -n $success ] # if success var is not null, batch upload succeeded
then
  echo "Your batch import succeeded."
else
  echo "Your batch import failed."
  echo "Please check your writeKey, file and JSON formatting to ensure that you're sending correct data. You can read more about batch importing in Segment's documentation here: https://segment.com/docs/sources/server/http/#batch"
fi
