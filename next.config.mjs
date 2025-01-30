import { withSentryConfig } from '@sentry/nextjs';
import createMDX from '@next/mdx';
import path from 'path';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: false,
});

const withMDX = createMDX({
  options: {
    remarkPlugins: [[`remark-frontmatter`], [`remark-mdx-frontmatter`]],
    rehypePlugins: [
      [
        'rehype-mdx-import-media',
        {
          strict: true,
          throwOnError: true,
        },
      ],
      ['rehype-extract-excerpt'],
      ['rehype-slug'],
      ['@stefanprobst/rehype-extract-toc', { name: 'toc' }],
      ['@stefanprobst/rehype-extract-toc/mdx', { name: 'toc' }],
      // ['@stefanprobst/rehype-extract-toc/mdx', { name: 'excerpt' }],
      [path.resolve(import.meta.dirname, './lib/rehype-wesbos.mjs')],
      [`rehype-mdx-title`],
      [path.resolve(import.meta.dirname, './lib/rehype-hot-tips.mjs')],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // transpilePackages: ['next-mdx-remote'],
  experimental: {
    mdxRs: false /* Turned off as it doesnt work with rehype plugins */,
    dynamicIO: false,
  },
  // compiler: {
  //   styledComponents: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
  },
};

export default withSentryConfig(withBundleAnalyzer(withMDX(nextConfig)), {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'bostype-inc',
  project: 'wesbos-com',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
