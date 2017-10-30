server {
	listen 80;
	listen [::]:80;

	server_name api.zgsoundboard.com www.api.zgsoundboard.com;
	error_log  /var/log/nginx/zgsoundboard-error.log;
	access_log /var/log/nginx/zgsoundboard-access.log;

	location / {
		proxy_pass http://back:3000;
		
		# Ajouter les headers de contrôle d'accès CORS
        add_header    'Access-Control-Allow-Origin' '*' always;
        add_header    'Access-Control-Allow-Methods' 'GET, POST, DELETE, PUT, OPTIONS' always;
        add_header    'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept' always;
        add_header    'Access-Control-Allow-Credentials' 'true' always;
	}
}