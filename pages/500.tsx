import { BodyHeader } from 'components/layout/bodyHeader';
import type { NextPageWithLayout } from './_app';

const Custom500: NextPageWithLayout = () => <></>;

Custom500.activeFab = false;
Custom500.getLayout = () => (
  <BodyHeader headerHeight={100} headerTitle="未知错误" />
);

export default Custom500;
