FROM ubuntu:22.04

RUN apt-get update
RUN apt-get install -y nginx curl zip

RUN echo "daemon off;" >> /etc/nginx/nginx.conf
RUN curl -o /var/www/html/main.zip -L https://codeload.github.com/CThomas-UT/ReactTSHangman/zip/main
RUN cd /var/www/html/ && unzip main.zip && mv ReactTSHangman-main/* . && rm -rf ReactTSHangman-main main.zip

EXPOSE 80

CMD ["/usr/sbin/nginx", "-c", "/etc/nginx/nginx.conf"]