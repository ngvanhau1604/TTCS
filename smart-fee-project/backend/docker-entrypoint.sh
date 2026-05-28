#!/bin/sh
set -e

# Strict mode: require PAYMENT_WEBHOOK_SECRET environment variable to be set
if [ -z "$PAYMENT_WEBHOOK_SECRET" ]; then
  echo "ERROR: PAYMENT_WEBHOOK_SECRET is not set. Set it before running the container (strict mode)." >&2
  exit 1
fi

JAVA_OPTS="${JAVA_OPTS:-}" \
exec java $JAVA_OPTS -Dpayment.webhook.secret="$PAYMENT_WEBHOOK_SECRET" -jar /app/app.jar
