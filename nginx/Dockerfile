FROM nginx:alpine

# Копируем наш конфиг nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Объявляем том, куда примонтирован будет собранный фронтенд
VOLUME ["/usr/share/nginx/html"]

# Метаданные для публикации в ghcr.io
LABEL org.opencontainers.image.source="ghcr.io/viefimov/film-react-nest-nginx"