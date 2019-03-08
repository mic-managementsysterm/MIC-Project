import React from 'react';
import classNames from 'classnames';
import { Row } from 'antd';
import styles from './index.less';

const DescriptionDetail = ({
  className,
  title,
  col = 1,
  layout = 'horizontal',
  gutter = 32,
  children,
  size,
  ...restProps
}) => {
  const clsString = classNames(styles.descriptionList, styles[layout], className, {
    [styles.small]: size === 'small',
    [styles.large]: size === 'large',
  });
  const column = col > 2 ? 2 : col;
  return (
    <div className={clsString} {...restProps}>
      {title ? <div className={styles.title}>{title}</div> : null}
      <Row gutter={gutter}>
        {React.Children.map(children, child =>
          child ? React.cloneElement(child, { column }) : child
        )}
      </Row>
    </div>
  );
};

export default DescriptionDetail;
