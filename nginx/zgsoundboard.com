server {
	listen 80;
	listen [::]:80;

	root /var/www/front;
	index index.php index.html index.htm;

	server_name zgsoundboard.com www.zgsoundboard.com;
	error_log  /var/log/nginx/zgsoundboard-error.log;
	access_log /var/log/nginx/zgsoundboard-access.log;

	location / {
		try_files $uri $uri/ /index.php?$query_string;
	}
}