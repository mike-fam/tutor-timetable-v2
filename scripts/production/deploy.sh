set -ex

SSH_CONFIG="Host *.eait.uq.edu.au
  StrictHostKeyChecking no
Host *.zones.eait.uq.edu.au
  ProxyJump $UQ_USERNAME@$UQ_NETWORK_HOST
  ForwardAgent yes
"

ENV_FILE="PORT=8081
DB_USER=tutor_timetable
DB_PW=$DB_PW
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tutor_timetable
MAIL_SERVER=mailhub.eait.uq.edu.au
MAIL_PORT=25
CORS_ORIGIN=127.0.0.1
ALLOCATOR_URL=http://localhost:9000
REDIS_HOST=localhost
REDIS_PORT=6379
NODE_ENV=production
"

cloneAndDeploy() {
	cd /var/www/nodejs/
	rm -rf tutor-timetable-v2
	git clone "$BITBUCKET_GIT_SSH_ORIGIN" tutor-timetable-v2
	cd tutor-timetable-v2
	echo "$ENV_FILE" > .env
	yarn
	yarn build
	yarn migration-run
	echo "$UQ_PW" | sudo -S systemctl restart nodejs
	history -c
}

echo "$SSH_CONFIG" >>~/.ssh/config
eval "$(ssh-agent -s)"
ssh-add /opt/atlassian/pipelines/agent/ssh/id_rsa

# shellcheck disable=SC2029
ssh "$UQ_USERNAME@$PRODUCTION_ZONE" "
	set -ex
	$(declare -f cloneAndDeploy)
	$(declare -p UQ_PW BITBUCKET_GIT_SSH_ORIGIN ENV_FILE)
	cloneAndDeploy
"
