#!/bin/bash
set -ex

# Constants
SSH_CONFIG="Host *.eait.uq.edu.au
  StrictHostKeyChecking no
Host *.zones.eait.uq.edu.au
  ProxyJump $UQ_USERNAME@$UQ_NETWORK_HOST
  ForwardAgent yes
"

NODEJS_SERVICE='[Unit]
Description=node.js with express.js
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/nodejs/tutor-timetable-v2
ExecStart=/usr/bin/node /var/www/nodejs/tutor-timetable-v2/build/server/server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
'

ENV_FILE="PORT=8081
DB_USER=tutor_timetable_v2
DB_PW=tutor_timetable_v2
DB_HOST=localhost
DB_PORT=5434
DB_NAME=tutor_timetable_v2
NODE_ENV=production
ENABLE_PLAYGROUND=true
"

PUB_KEY=$(ssh-keygen -y -f /opt/atlassian/pipelines/agent/ssh/id_rsa)
ZONE="$1.zones.eait.uq.edu.au"

createZone() {
	local zone_name=$1
	local uq_user=$2
	local zone="$zone_name.zones.eait.uq.edu.au"
	source /etc/profile
	set -x
	if ! triton --act-as=itee inst list -o name | tail -n +2 | grep -q "$zone_name"; then
		echo No zone with existing name found, creating new zone...
		triton --act-as=itee inst create --wait --name "$zone_name" --network zones --metadata uq_users="$uq_user ${ZONE_ADMINS//,/ }" webproject z1-2xlarge
		echo Zone successfully created.
		echo Trying to ssh into zone
		for i in {1..30}; do
			echo "Attempt: $i"
			if nc -z "$zone" 22 >/dev/null 2>/dev/null; then
				echo Zone is ready
				sleep 5
				break
			fi
			sleep 5
		done
		ssh -o "StrictHostKeyChecking=no" -o "UserKnownHostsFile /dev/null" "root@$zone" "
			$(declare -p NODEJS_SERVICE)
			$(declare -f setUpZone)
			setUpZone
		"
	else
		echo "Zone $zone_name already exists"
	fi
	ssh -o "StrictHostKeyChecking=no" -o "UserKnownHostsFile /dev/null" "root@$zone" "
		$(declare -p PUB_KEY)
		$(declare -f setUpZoneUsers)
		uq-add-user $uq_user || true
		setUpZoneUsers $uq_user $ZONE_ADMINS
	"
}

setUpZoneUsers() {
	local uq_user=$1
	set -ex
	for username in ${ZONE_ADMINS//,/ }; do
		uq-add-user "$username" || true
	done
	mkdir -p "/home/$uq_user/.ssh"
	if [ ! -f "/home/$uq_user/.ssh/authorized_keys" ]; then
		touch "/home/$uq_user/.ssh/authorized_keys"
	fi
	if ! grep -q "$PUB_KEY" "/home/$uq_user/.ssh/authorized_keys"; then
		echo Adding public key to zone
		echo "$PUB_KEY" >>"/home/$uq_user/.ssh/authorized_keys"
	else
		echo Public key already added
	fi
}

setUpZone() {
	webprojctl enable nodejs
	webprojctl enable postgres
	webprojctl enable redis
	createdb tutor_timetable_v2
	createuser tutor_timetable_v2
	psql -c "alter user tutor_timetable_v2 with password 'tutor_timetable_v2'"
	psql tutor_timetable_v2 -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
	npm install -g yarn
	echo "$NODEJS_SERVICE" >/etc/systemd/system/nodejs.service
	systemctl daemon-reload
}

setUpService() {
	set -ex
	export GIT_SSH_COMMAND="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"
	rm -rf /var/www/nodejs/*
	cd /var/www/nodejs
	git clone git@bitbucket.org:elipse-team/tutor-tt.git tutor-timetable-v2
	cd /var/www/nodejs/tutor-timetable-v2
	git config user.email "$BITBUCKET_BRANCH@no-reply.com"
	git config user.name "$BITBUCKET_BRANCH"
	git checkout "$BITBUCKET_BRANCH"
	if [ -n "$BITBUCKET_PR_DESTINATION_BRANCH" ]; then
    git checkout "$BITBUCKET_PR_DESTINATION_BRANCH"
    git merge "$BITBUCKET_BRANCH"
	fi
	yarn
	echo "$ENV_FILE" >.env
	yarn build
	yarn migration-run
	echo "$UQ_PW" | sudo -S bash -c "
		$(declare -p WEB_ADMINS)
		$(declare -f setUpDb)
		setUpDb
	"
	echo "$UQ_PW" | sudo -S systemctl restart nodejs
}

setUpDb() {
	for username in ${WEB_ADMINS//,/ }; do
		psql tutor_timetable_v2 <<-SQL
			INSERT INTO public."user" (username, name, email, "isAdmin", "settingsId") VALUES ('$username', '__redacted__', '__redacted__', true, NULL)
			ON CONFLICT (username) DO UPDATE SET "isAdmin" = true;
		SQL
	done
	for i in {1..20}; do
		psql tutor_timetable_v2 <<-SQL
			INSERT INTO public."user" (username, name, email, "isAdmin", "settingsId") VALUES ('uqfoobar$i', 'Dummy User $i', 'uqfoobar@uq.edu.au', false, NULL)
			ON CONFLICT (username) DO NOTHING;
		SQL
	done
	psql tutor_timetable_v2 <<-SQL
		INSERT INTO public.course (code, title, id) VALUES
			('CSSE1001', 'Introduction to Software Engineering', '0a2e6669-f8aa-45e9-8aeb-7a92ed495871')
			ON CONFLICT (id) DO UPDATE SET (code, title, id) = (EXCLUDED.code, EXCLUDED.title, EXCLUDED.id);
		INSERT INTO public.term (type, year, "weekNames", "startDate", "endDate", id, "isActive") VALUES
			('Semester 2', 2021, '{O-Week,"Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7","Week 8","Week 9",Break,"Week 10","Week 11","Week 12","Week 13",SWOTVAC,Examination,Examination,Examination}', '2021-07-19 10:00:00', '2021-11-21 10:00:00', '6a27f0f9-2c6c-478e-8088-ec7eb221a60d', true)
			ON CONFLICT (id) DO UPDATE SET (type, year, "weekNames", "startDate", "endDate", id, "isActive") =
				(EXCLUDED.type, EXCLUDED.year, EXCLUDED."weekNames", EXCLUDED."startDate", EXCLUDED."endDate", EXCLUDED.id, EXCLUDED."isActive");
		INSERT INTO public.timetable (id, "courseId", "termId", "permanentRequestLock", "temporaryRequestLock", "allocationToken") VALUES
			('86b6d4b0-a8c5-4c42-8278-e649144f92b3', '0a2e6669-f8aa-45e9-8aeb-7a92ed495871', '6a27f0f9-2c6c-478e-8088-ec7eb221a60d', 'FREE', 'FREE', NULL)
			ON CONFLICT (id) DO UPDATE SET (id, "courseId", "termId", "permanentRequestLock", "temporaryRequestLock", "allocationToken") =
				(EXCLUDED.id, EXCLUDED."courseId", EXCLUDED."termId", EXCLUDED."permanentRequestLock", EXCLUDED."temporaryRequestLock", EXCLUDED."allocationToken");
	SQL
}

# Start of script
if [ -z "$1" ]; then
	echo No argument supplied
	exit 1
fi

# ssh set up
echo "$SSH_CONFIG" >>~/.ssh/config
eval "$(ssh-agent -s)"
ssh-add /opt/atlassian/pipelines/agent/ssh/id_rsa

# Create and set up zone
# shellcheck disable=SC2029
ssh "$UQ_USERNAME@$UQ_NETWORK_HOST" "
  $(declare -p NODEJS_SERVICE PUB_KEY ZONE_ADMINS)
  $(declare -f setUpZone setUpZoneUsers createZone)
  createZone $1 $UQ_USERNAME
"

# Clone repo on zone and start server
# shellcheck disable=SC2029
ssh "$UQ_USERNAME@$ZONE" "
	$(declare -p BITBUCKET_BRANCH BITBUCKET_PR_DESTINATION_BRANCH ENV_FILE UQ_PW WEB_ADMINS)
	$(declare -f setUpDb setUpService)
	setUpService
"
