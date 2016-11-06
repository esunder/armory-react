import { PropTypes } from 'react';
import cx from 'classnames';

import styles from './styles.less';
import PieSegment from './PieSegment';
import Label from './Label';

const PieChart = ({ dataValues, className, size }) => {
  const radius = size / 2;
  const max = dataValues.reduce((total, { value }) => (total + value), 0);
  let currentRotationOffset = 0;

  return (
    <ul className={cx(styles.root, className)} style={{ width: size, height: size }}>
      {dataValues.reduce((segments, data) => {
        const centralAngle = 360 / (max / data.value);

        segments.push(
          <li key={data.name}>
            <Label
              radius={radius}
              label={data.name}
              centralAngle={centralAngle}
              rotationOffset={currentRotationOffset}
            />

            <PieSegment
              data={data}
              centralAngle={centralAngle}
              rotationOffset={currentRotationOffset}
            />
          </li>
        );

        currentRotationOffset += centralAngle;

        return segments;
      }, [])}
    </ul>
  );
};

PieChart.defaultProps = {
  size: 256,
};

PieChart.propTypes = {
  dataValues: PropTypes.arrayOf(PieSegment.propTypes.data),
  className: PropTypes.string,
  size: PropTypes.number,
};

export default PieChart;
