import Link from 'next/link';
import { siteCopy } from './content';
import { getLocale } from './locale';

export default async function NotFound() {
  const locale = await getLocale();
  const { common } = siteCopy[locale];
  return (
    <main id="main" data-route="404" className="not-found">
      <p className="not-found-code">404</p>
      <h1>{common.notFoundTitle}</h1>
      <p>{common.notFoundBody}</p>
      <Link className="button button-solid" href="/" prefetch={false}>
        {common.backHome}
      </Link>
    </main>
  );
}
