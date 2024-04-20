
# Frontend build

FROM node as frontend_build

WORKDIR /app/frontend
COPY ./package.json ./

RUN npm install

COPY ./ .


RUN if [ -d "node_modules" ]; then rm -Rf node_modules; fi
RUN if [ -f "package-lock.json" ]; then rm package-lock.json; fi
RUN npm install

RUN npm i @rollup/rollup-linux-x64-gnu

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
