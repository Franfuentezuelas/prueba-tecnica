// import { defineConfig } from 'vitest/config';

// export default defineConfig({
//   test: {
//     environment: 'jsdom',
//     globals: true,
//     setupFiles: ['./tests/setup.ts'],
//     css: false,
//   },
// });


import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    css: false,
  },
  resolve: {
    alias: {
      '\\.module\\.css$': path.resolve(__dirname, 'tests/__mocks__/styleMock.js'),
    },
  },
});

