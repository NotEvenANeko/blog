import type { FC } from 'react';

export interface SpacingProps {
  spacing: string;
  direction: 'row' | 'column';
}

export const Spacing: FC<SpacingProps> = (props) => {
  return props.direction === 'row' ? (
    <div style={{ width: props.spacing }} />
  ) : (
    <div style={{ height: props.spacing }} />
  );
};
