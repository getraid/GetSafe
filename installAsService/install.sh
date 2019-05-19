sudo cp getsafe.service /lib/systemd/system/getsafe.service
sudo systemctl daemon-reload
sudo systemctl enable getsafe
sudo systemctl restart getsafe
