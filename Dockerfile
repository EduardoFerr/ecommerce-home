# STAGE 1: Build da Aplicação
FROM node:20-alpine AS build

WORKDIR /app

# Copia apenas os ficheiros de dependências para aproveitar o cache do Docker
COPY package*.json ./
RUN npm install

# Copia o resto do código e gera o build de produção
COPY . .
RUN npm run build

# STAGE 2: Servidor de Produção (Nginx)
FROM nginx:stable-alpine

# Copia o build do stage anterior para a pasta pública do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia uma configuração personalizada do Nginx para lidar com Single Page Application (SPA)
# Se não houver, o Nginx padrão serve bem para este desafio simples
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]