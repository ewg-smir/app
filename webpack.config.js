import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
  resolve: {
    fallback: {
      timers: require.resolve("timers-browserify"),
    },
  },
};