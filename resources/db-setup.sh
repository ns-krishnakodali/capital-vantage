#!/usr/bin/env bash
set -euo pipefail

DB_NAME="cv_db"
DB_USER="cv_user"
DB_PASSWORD="cv_password"

POSTGRES_HOST="localhost"
POSTGRES_PORT="5432"

echo "Checking whether PostgreSQL is running..."

if ! pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" > /dev/null 2>&1; then
  echo "PostgreSQL is not reachable at $POSTGRES_HOST:$POSTGRES_PORT"
  echo "Please start PostgreSQL first, then run this script again."
  exit 1
fi

echo "PostgreSQL is running."

echo "Creating/updating Postgres user '$DB_USER'..."

cd /tmp

sudo -u postgres psql <<SQL
DO \$\$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_roles WHERE rolname = '$DB_USER'
  ) THEN
    CREATE ROLE $DB_USER WITH LOGIN PASSWORD '$DB_PASSWORD';
  ELSE
    ALTER ROLE $DB_USER WITH LOGIN PASSWORD '$DB_PASSWORD';
  END IF;
END
\$\$;
SQL

echo "Creating database '$DB_NAME' if needed..."

DB_EXISTS="$(sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'")"

if [[ "$DB_EXISTS" != "1" ]]; then
  sudo -u postgres createdb "$DB_NAME" --owner="$DB_USER"
  echo "Database '$DB_NAME' created."
else
  echo "Database '$DB_NAME' already exists."
fi

echo "Done."

