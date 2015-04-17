# NB This file should only be used for configuring a new box

echo "******************************************"
echo "************** ADDONS ********************"
echo "******************************************"

echo "** XDEBUG CONFIG **"

xdebug="
xdebug.remote_enable = on
xdebug.remote_connect_back = on
xdebug.idekey = 'vagrant'
"
sudo echo "$xdebug" >> "/etc/php5/mods-available/xdebug.ini"

echo "** INSTALLING MAILCATCHA **"
sudo apt-get install ruby1.9.1-dev -y
sudo apt-get install libsqlite3-dev
sudo gem install mailcatcher

sudo sed -i 's/;sendmail_path =/sendmail_path = \/usr\/bin\/env catchmail -f test@edentic.local/g' /etc/php5/fpm/php.ini
sudo sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 1G/g' /etc/php5/fpm/php.ini
sudo sed -i 's/post_max_size = 8M/post_max_size = 1G/g' /etc/php5/fpm/php.ini
touch  /home/vagrant/Code/nginx.conf

# Add config to mods-available for PHP
# -f flag sets "from" header for us
echo "sendmail_path = /usr/bin/env $(which catchmail) -f test@local.dev" | sudo tee /etc/php5/mods-available/mailcatcher.ini

# Enable sendmail config for all php SAPIs (apache2, fpm, cli)
sudo php5enmod mailcatcher

echo "** RESTARTING THINGS **"
service php5-fpm restart
service nginx restart

echo "** INSTALLING PHPUNIT **"
wget https://phar.phpunit.de/phpunit.phar
chmod +x phpunit.phar
sudo mv phpunit.phar /usr/local/bin/phpunit
sudo phpunit --version
