#!/bin/bash
cd /tmp/kavia/workspace/code-generation/messenger-ui-clone-5897-5906/messenger_clone_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

