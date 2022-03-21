FROM node:16.13.1

# create destination directory
RUN mkdir -p /usr/src/raspect
WORKDIR /usr/src/raspect

# copy the app, note .dockerignore
COPY . /usr/src/raspect/
RUN yarn install 

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN yarn generate

# expose 3000 on container 
EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

# start the app
CMD ["yarn", "start"]