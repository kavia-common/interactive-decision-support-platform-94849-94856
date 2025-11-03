#!/bin/bash
cd /home/kavia/workspace/code-generation/interactive-decision-support-platform-94849-94856/dsp_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

