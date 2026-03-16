'use strict';

const crypto = require('crypto');

// Re-implement the build.js helper functions in isolation
// (build.js is a CLI script, not a module — we test the logic directly)

function contentHash(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex').slice(0, 8);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

describe('contentHash', () => {
  it('produces an 8-character string', () => {
    const hash = contentHash(Buffer.from('hello world'));
    assertEqual(hash.length, 8);
  });

  it('produces only hex characters', () => {
    const hash = contentHash(Buffer.from('test content'));
    assert(/^[0-9a-f]{8}$/.test(hash), `Expected hex string, got "${hash}"`);
  });

  it('is deterministic (same input → same output)', () => {
    const a = contentHash(Buffer.from('deterministic'));
    const b = contentHash(Buffer.from('deterministic'));
    assertEqual(a, b);
  });

  it('produces different hashes for different inputs', () => {
    const a = contentHash(Buffer.from('input one'));
    const b = contentHash(Buffer.from('input two'));
    assert(a !== b, `Expected different hashes, both got "${a}"`);
  });

  it('handles empty buffer', () => {
    const hash = contentHash(Buffer.from(''));
    assertEqual(hash.length, 8);
    assert(/^[0-9a-f]{8}$/.test(hash), `Expected hex string, got "${hash}"`);
  });

  it('handles binary content', () => {
    const buf = Buffer.from([0x00, 0xff, 0x80, 0x01]);
    const hash = contentHash(buf);
    assertEqual(hash.length, 8);
    assert(/^[0-9a-f]{8}$/.test(hash), `Expected hex string, got "${hash}"`);
  });
});

describe('escapeRegex', () => {
  it('escapes dots', () => {
    assertEqual(escapeRegex('file.js'), 'file\\.js');
  });

  it('escapes asterisks', () => {
    assertEqual(escapeRegex('a*b'), 'a\\*b');
  });

  it('escapes plus signs', () => {
    assertEqual(escapeRegex('a+b'), 'a\\+b');
  });

  it('escapes question marks', () => {
    assertEqual(escapeRegex('a?b'), 'a\\?b');
  });

  it('escapes caret and dollar', () => {
    assertEqual(escapeRegex('^start$'), '\\^start\\$');
  });

  it('escapes curly braces', () => {
    assertEqual(escapeRegex('a{1,2}'), 'a\\{1,2\\}');
  });

  it('escapes parentheses', () => {
    assertEqual(escapeRegex('(group)'), '\\(group\\)');
  });

  it('escapes pipe', () => {
    assertEqual(escapeRegex('a|b'), 'a\\|b');
  });

  it('escapes square brackets', () => {
    assertEqual(escapeRegex('[abc]'), '\\[abc\\]');
  });

  it('escapes backslashes', () => {
    assertEqual(escapeRegex('a\\b'), 'a\\\\b');
  });

  it('leaves normal strings untouched', () => {
    assertEqual(escapeRegex('hello'), 'hello');
    assertEqual(escapeRegex('app-core'), 'app-core');
  });

  it('handles empty string', () => {
    assertEqual(escapeRegex(''), '');
  });

  it('escapes multiple metacharacters in one string', () => {
    const input = 'styles.css?v=1.0';
    const escaped = escapeRegex(input);
    assertEqual(escaped, 'styles\\.css\\?v=1\\.0');
    // Verify the escaped string works as a regex that matches the original
    const re = new RegExp(escaped);
    assert(re.test(input), 'Escaped regex should match original string');
  });

  it('produces a regex that matches the literal input', () => {
    const tricky = 'src="app-core.js"';
    const re = new RegExp(escapeRegex(tricky));
    assert(re.test(tricky), 'Should match the literal string');
    assert(!re.test('src="app-coreXjs"'), 'Should not match with dot as wildcard');
  });
});
