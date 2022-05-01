import type { FC, ReactElement, ReactNode } from 'react';
import { BodyContainer } from './bodyContainer';
import { BodyHeader } from './bodyHeader';

export interface DefaultLayoutProps {
  headerTitle?: string | ReactElement;
  headerHeight: number;
  headerBanner?: string;
  children: ReactNode;
}

export const DefaultLayout: FC<DefaultLayoutProps> = (props) => {
  return (
    <>
      <BodyHeader {...props} />
      <BodyContainer {...props} />
    </>
  );
};
