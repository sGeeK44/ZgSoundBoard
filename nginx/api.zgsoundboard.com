server {
	listen 80;
	listen [::]:80;

	server_name api.zgsoundboard.com www.api.zgsoundboard.com;
	error_log  /var/log/nginx/zgsoundboard-error.log;
	access_log /var/log/nginx/zgsoundboard-access.log;

	location / {
		proxy_pass http://back;
	}
}