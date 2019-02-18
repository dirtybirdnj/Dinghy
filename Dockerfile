FROM balenalib/armv7hf-ubuntu

RUN install_packages libssl-dev build-essential curl gnupg

RUN curl -sL https://deb.nodesource.com/setup_8.x  | bash -
RUN apt-get -y install nodejs
RUN node -v
RUN npm install --save cross-env

RUN install_packages python2.7 python-setuptools python-dev
RUN install_packages libcairo2-dev libgphoto2-6 libgphoto2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

WORKDIR /usr/src/app

COPY package.json package.json

# This install npm dependencies on the balena build server,
# making sure to clean up the artifacts it creates in order to reduce the image size.
RUN JOBS=MAX npm install --production --unsafe-perm && npm cache verify && rm -rf /tmp/*

COPY . ./

# Enable udevd so that plugged dynamic hardware devices show up in our container.
ENV UDEV=1

# server.js will run when container starts up on the device
CMD ["npm", "run", "device"]