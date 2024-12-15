import { defineConfig } from 'tsup';

export default defineConfig({
      entry: ['src/index.ts'], // نقطه ورود
      format: ['esm', 'cjs'], // فرمت‌های خروجی
      dts: true, // تولید فایل‌های .d.ts
      sourcemap: true, // نقشه منبع
      minify: true, // کوچک‌سازی کد
      clean: true, // پاک‌سازی خروجی قبلی
      external: ['react', 'react-dom'], // وابستگی‌های خارجی
});
