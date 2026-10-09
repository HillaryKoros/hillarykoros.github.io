import { Link } from 'wouter';
import { useSeo } from '../lib/seo';
import { buttonStyles } from '../components/primitives';

export default function NotFoundPage() {
  useSeo({
    title: 'Page not found',
    description: 'That page does not exist.',
    path: '/404',
  });

  return (
    <div className="container flex min-h-[55vh] flex-col items-start justify-center py-20">
      <p className="label">Error 404</p>
      <h1 className="text-title mt-4">This page doesn't exist.</h1>
      <p className="mt-4 max-w-measure text-lede text-muted-foreground">
        The link may be out of date, or the page may have moved during the site rebuild.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className={buttonStyles.primary}>
          Back home
        </Link>
        <Link href="/work" className={buttonStyles.secondary}>
          Browse the work
        </Link>
      </div>
    </div>
  );
}
