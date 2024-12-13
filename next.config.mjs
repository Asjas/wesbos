import createMDX from '@next/mdx';
import rehypeMdxImportMedia from 'rehype-mdx-import-media';
// import { mdxToc, tocAttacher } from './lib/rehype-toc';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { rehypeWesBosMdx } from './lib/rehype-wesbos.mjs';
import rehypeExtractToc from '@stefanprobst/rehype-extract-toc';
import rehypeExtractTocMdx from '@stefanprobst/rehype-extract-toc/mdx';
import { rehypeHotTips, rehypeMdxTitle } from './lib/rehype-hot-tips.mjs';
const withMDX = createMDX({
  options: {
    /* webpackExclude: /\.noimport\.json$/ */
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [
      [
        'rehype-mdx-import-media',
        {
          strict: true,
          throwOnError: true,
        },
      ],
      ['rehype-slug'],
      [rehypeExtractToc, { name: 'toc' }],
      [rehypeExtractTocMdx, { name: 'toc' }],
      // [mdxToc, { name: 'toc' }],
      [rehypeWesBosMdx, { name: 'wesbos' }],
      [rehypeMdxTitle],
      [rehypeHotTips],
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
};

export default withMDX(nextConfig);
