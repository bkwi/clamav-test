const NodeClam = require('clamscan');
const Readable = require('stream').Readable;


const ClamScan = new NodeClam().init({
  debugMode: true,
    clamscan: {
      active: false
  },
  clamdscan: {
    socket: null,
    localFallback: false,
    host: 'localhost',
    port: '3310'
  },
  preference: 'clamdscan'
});

ClamScan.then(async clamscan => {
    try {
      const version = await clamscan.getVersion();
      console.log(`ClamAV Version: ${version}`);

      const rs = Readable();
      rs.push('X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*');
      rs.push(null);      
      const response = await clamscan.scanStream(rs);
      console.log(response);


    } catch (err) {
      console.log('Scanning error', err)
    }
}).catch(err => {
  console.log('Init error', err)
});
