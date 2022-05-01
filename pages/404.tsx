import { BodyHeader } from 'components/layout/bodyHeader';
import type { NextPageWithLayout } from './_app';

const Custom404: NextPageWithLayout = () => <></>;

Custom404.activeFab = false;
Custom404.getLayout = () => (
  <BodyHeader headerHeight={100} headerTitle="找不到页面" />
);

export default Custom404;
