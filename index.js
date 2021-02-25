const Hyperbeam = require('hyperbeam')

// 'from mafintosh' should be a somewhat unique topic used to derive a discovery key.
// to find the other side of your pipe. it's seemed with a determistic timestamp from ~+-30min for better privacy
// once the other peer is discovered it is used to derive a noise keypair as well.
const beam = new Hyperbeam('from mafintosh')

// make a little chat app
process.stdin.pipe(beam).pipe(process.stdout)