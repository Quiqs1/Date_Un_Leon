import assert from 'node:assert/strict';
import test from 'node:test';

import { app } from '../dist/src/index.js';

test('GET /health returns service status', async () => {
  const server = app.listen(0);

  try {
    await new Promise((resolve) => server.once('listening', resolve));
    const address = server.address();
    const baseUrl = `http://127.0.0.1:${address.port}`;
    const response = await fetch(`${baseUrl}/health`);

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      status: 'ok',
      message: 'API Date Un Leon funcionando',
    });
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  }
});

test('API responses include security headers', async () => {
  const server = app.listen(0);

  try {
    await new Promise((resolve) => server.once('listening', resolve));
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}/health`);

    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(response.headers.has('x-powered-by'), false);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  }
});
