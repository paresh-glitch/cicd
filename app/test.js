const http = require('http');

let passed = 0;
let failed = 0;

function check(name, condition) {
    if (condition) {
        console.log(`✅ ${name}`);
        passed++;
    } else {
        console.log(`❌ ${name}`);
        failed++;
    }
}

const app = require('./index');

setTimeout(() => {
    const req = http.get('http://localhost:3000/health', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const body = JSON.parse(data);
            check('health returns 200', res.statusCode === 200);
            check('status is healthy', body.status === 'healthy');

            console.log(`\n${passed} passed, ${failed} failed`);

            app.close();
            process.exit(failed > 0 ? 1 : 0);  // exit 1 = fail, exit 0 = pass
        });
    });
    req.on('error', (err) => {
        console.log('❌ Could not connect to app:', err.message);
        process.exit(1);
    });
}, 500);
