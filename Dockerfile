FROM nginx

WORKDIR /usr/share/react

RUN curl -fsSL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install -y nodejs

COPY package*.json ./

RUN npm install

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL $REACT_APP_API_URL

COPY . .

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN npm run build

RUN rm -r /usr/share/nginx/html/*

RUN cp -a dist/. /usr/share/nginx/html