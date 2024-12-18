import { headingRank as rank } from 'hast-util-heading-rank';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';
import { name as isIdentifierName } from 'estree-util-is-identifier-name'
import { valueToEstree } from 'estree-util-value-to-estree'
import { createVisitors } from 'estree-util-scope';
import path from 'path';
// import { walk} from 'estree-walker';

// MDX script to convert the TOC to an export on the MDX file
export function rehypeWesBosMdx({ name = 'wesbos' } = {}) {
  if (!isIdentifierName(name)) {
    throw new Error(
      `The name should be a valid identifier name, got: ${JSON.stringify(
        name,
      )}`,
    )
  }

  // Adds file path to the frontmatter
  return function transformer(tree, vfile) {
    tree.children.unshift({
      type: 'mdxjsEsm',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ExportNamedDeclaration',
              source: null,
              specifiers: [],
              declaration: {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: 'filePath' },
                    init: valueToEstree(path.relative(process.cwd(), vfile.path)),
                  },
                ],
              },
            },
          ],
        },
      },
    });
  }
}

export default rehypeWesBosMdx;
