class Ip {
    getWorkingIp(ip) {
        if (ip === '::ffff:172.17.0.1') {
            // Backup IP for the localhost
            return { ip: '2.38.11.219' };
        }

        return { ip };
    }
}

module.exports = new Ip();
