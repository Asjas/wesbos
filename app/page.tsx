import Link from 'next/link';
import { Metadata } from 'next';
import H from '../components/mdxComponents/Headings';

export const meta: Metadata = {
  title: {
    absolute: 'Wes Bos - Full Stack Developer',
  },
};

export default function HomePage() {
  return (
    <div className="welcome">
      <div>
        <H as="h2">Hey, I'm Wes&nbsp;Bos.</H>

        <H as="h2" looksLike="h1">
          <span className="highlight">I'm here to help you become a really good web developer.</span>
        </H>

        <p>I'm a full Stack JavaScript developer from Canada 🇨🇦.</p>
        <p>
          I create <Link href="/courses">free + premium courses</Link> and do a <a href="https://syntax.fm">twice weekly podcast</a> called Syntax.
        </p>
        <p>
          You can <Link href="/about">read more about me here</Link>, but stick around if you like CSS, JavaScript, mediocre jokes, learning new things or BBQ Tips.
        </p>
      </div>
    </div>
  );
}

