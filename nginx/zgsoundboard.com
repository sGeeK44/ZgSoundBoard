server {
	listen 80;
	listen [::]:80;

	server_name zgsoundboard.com www.zgsoundboard.com;
	error_log  /var/log/nginx/zgsoundboard-error.log;
	access_log /var/log/nginx/zgsoundboard-access.log;

	location / {
		proxy_pass http://front:4200;
	}
}