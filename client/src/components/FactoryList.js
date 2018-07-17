import React from 'react';
import { PropTypes as T} from "prop-types"
import Factory from './Factory';

const FactoryList = (props) => {
  const { factories = [] } = props;
  return factories.map((factory) => {
    const { id, name, upper, lower, children } = factory;
    return (
        <div key={id}>
          <Factory
            id={id}
            name={name}
            upper={upper}
            lower={lower}
            children={children}
          />
        </div>
    );
  });
};

FactoryList.propTypes = {
  factories: T.arrayOf(T.shape({
    id: T.string.isRequired,
    name: T.string.isRequired,
    lower: T.number.isRequired,
    upper: T.number.isRequired,
    children: T.arrayOf(T.number)
  }))
};

export default FactoryList;


