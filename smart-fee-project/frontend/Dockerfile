FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
COPY tsconfig.json vite.config.ts postcss.config.js tailwind.config.js ./
COPY src ./src
RUN npm ci && npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
