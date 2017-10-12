server {
	listen 80;
	listen [::]:80;

	root /var/www/back;
	index index.php index.html index.htm;

	server_name api.zgsoundboard.com www.api.zgsoundboard.com;
	error_log  /var/log/nginx/zgsoundboard-pictio-error.log;
	access_log /var/log/nginx/zgsoundboard-pictio-access.log;

	location / {
		try_files $uri $uri/ /index.php?$query_string;
	}
}