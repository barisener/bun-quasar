# Bu Dockerfile, Quasar Framework projenizi çalıştırabilmek için gerekli paketleri yükler.
FROM node:18-alpine AS develop-stage

# Projemizin bulunduğu dizini oluşturuyoruz
WORKDIR /app
EXPOSE 80

# Quasar'a ait paketlerini konsola indiriyoruz
# RUN npm install --global @quasar/cli@2.0.0

# Projenin bulunduğu dizine geçiyoruz ve projemizi konsoldan çalıştırıyoruz
COPY package.json ./
RUN npm install --silent
RUN npm install --global @quasar/cli@2.0.0
COPY . .
# Projemizin bulunduğu dizine tekrar geliyoruz ve projemizi çalıştırmaya hazırlanıyoruz

FROM develop-stage AS build-stage
RUN npm run build

# Projemizi çalıştırıyor ve port 8080'a bind ediyoruz
FROM nginx:1.23.3-alpine AS production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD nginx -g "daemon off;"
