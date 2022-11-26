# Dockerfile  
    FROM node:16 
#Setting a default value to Argument 

ENV UDPM11_API_PORT = 3001
ENV UDPM11_PORT_DB = 3306
ENV UDPM11_USER_DB = 'ducnv'
ENV UDPM11_HOST = '20.189.112.68'
ENV UDPM11_PASSWORD = 'Ducnv_2509'
ENV UDPM11_DB_NAME = 'db_udpm11_v1'
ENV UDPM11_MIN_CONECTION_POOL = 0,
ENV UDPM11_ACQUIRE_CONECTION_POOL = 30000,
ENV UDPM11_IDLE_CONECTION_POOL = 20000,
ENV UDPM11_epassword = 'upqsjnlxmkxzmtmv'
ENV UDPM11_eEmail = 'fptis.info@gmail.com'
ENV UDPM11_TOKEN_GHN = '1c05f4b4-5cf8-11ed-8a70-52fa25d1292f'
 
    WORKDIR /app  
    COPY . /app  
    RUN npm install  
    EXPOSE 	3001/udp 
    EXPOSE 	3001/tcp 
    CMD node UDPM11.js
