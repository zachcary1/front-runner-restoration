import dns from 'dns';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import contactRouter from './routes/contact.js';
import chatRouter from './routes/chat.js';

// Railway's containers report an IPv6 interface but can't actually route
// outbound IPv6, which breaks outbound SMTP (e.g. Gmail) intermittently:
// nodemailer resolves A/AAAA itself via dns.Resolver and picks a random
// address from the combined list, and if that resolver fails it falls back
// to plain dns.lookup(), which can also return an AAAA address first. Force
// IPv4 on both paths app-wide.
dns.setDefaultResultOrder('ipv4first');
if (dns.Resolver) {
  dns.Resolver.prototype.resolve6 = (hostname, callback) => callback(null, []);
}
const originalLookup = dns.lookup;
dns.lookup = (hostname, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  return originalLookup(hostname, { ...options, family: 4 }, callback);
};

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.use('/api/contact', contactRouter);
app.use('/api/chat', chatRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve the built client if present, so a single Railway service can host both.
const clientDist = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.use((req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
