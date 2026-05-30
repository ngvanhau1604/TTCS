FROM node:18-alpine AS build
WORKDIR /app

# Copy các file cấu hình trước
COPY package.json package-lock.json* ./

# Copy toàn bộ mã nguồn vào container
COPY . . 

# Cài đặt thư viện và build ngay sau khi đã copy xong toàn bộ file
RUN npm ci && npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]