#!/bin/sh
set -e

# Default port to 8080 if not provided by hosting environment (Render provides $PORT)
PORT=${PORT:-8080}
echo "[ENTRYPOINT] Configuring Nginx to listen on port ${PORT}..."
sed -i "s/__PORT__/${PORT}/g" /etc/nginx/nginx.conf

# Ensure storage and bootstrap directories exist with proper permissions
mkdir -p /var/www/html/storage/framework/cache/data \
         /var/www/html/storage/framework/sessions \
         /var/www/html/storage/framework/views \
         /var/www/html/storage/logs \
         /var/www/html/bootstrap/cache

chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# If SQLite is selected and database file doesn't exist, create it
if [ "${DB_CONNECTION}" = "sqlite" ] && [ ! -f "/var/www/html/database/database.sqlite" ]; then
    echo "[ENTRYPOINT] Creating SQLite database file..."
    touch /var/www/html/database/database.sqlite
    chown www-data:www-data /var/www/html/database/database.sqlite
    chmod 664 /var/www/html/database/database.sqlite
fi

# Link public storage
echo "[ENTRYPOINT] Linking storage directory..."
php artisan storage:link --force || true

# Optimize Laravel configuration, routes, and views
echo "[ENTRYPOINT] Caching Laravel configurations..."
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

# Run database migrations
if [ "${RUN_MIGRATIONS}" = "true" ] || [ -n "${DB_HOST}" ] || [ "${DB_CONNECTION}" = "sqlite" ]; then
    echo "[ENTRYPOINT] Running database migrations..."
    php artisan migrate --force || echo "[ENTRYPOINT] Migration skipped or encountered warning."

    # Run seeders if RUN_SEEDER is true
    if [ "${RUN_SEEDER}" = "true" ]; then
        echo "[ENTRYPOINT] Seeding initial data (Roles, Admin, Depots)..."
        php artisan db:seed --force || echo "[ENTRYPOINT] Seeder skipped or encountered warning."
    fi
fi

echo "[ENTRYPOINT] Starting Supervisord (Nginx + PHP-FPM)..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
