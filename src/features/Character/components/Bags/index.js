// @flow

import type { Items, Bags } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';

import Container from 'common/components/Container';
import Item from 'features/Character/components/Item';
import actions from 'features/Gw2/actions';

import styles from './styles.less';

function mapStateToProps (state) {
  return {
    items: state.items,
    bags: (state.characters.data[state.characters.selected] || {}).bags || [],
  };
}

type Props = {
  bags?: Bags,
  items?: Items,
  fetchItems?: (any) => void,
  // dispatch?: (any) => void,
};

@connect(mapStateToProps/*, {
  fetchItems: actions.fetchItems,
}*/)
export default class CharacterBags extends Component {
  props: Props;

  componentWillMount () {
    this.fetchBagItems(this.props.bags);
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.bags !== nextProps.bags) {
      this.fetchBagItems(nextProps.bags);
    }
  }

  fetchBagItems = (bags: Bags) => {
    const itemIds = bags.reduce((ids, bag) => {
      ids.push(bag.id);
      const inventoryIds = bag.inventory.map((inv) => inv && inv.id);
      return ids.concat(inventoryIds);
    }, []);

    this.props.dispatch && this.props.dispatch(actions.fetchItems(itemIds));
    // this.props.fetchItems && this.props.fetchItems(itemIds);
  }

  render () {
    const { bags, items } = this.props;

    return (
      <Container className={styles.root}>
        <div className={styles.bags}>
          {bags && bags.map((bag, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Item key={index} item={items && items[bag.id]} />
          ))}
        </div>

        <div className={styles.items}>
          {bags && bags
          .reduce((ids, bag) => {
            const inventoryIds = bag.inventory.map((inv) => inv && inv.id);
            return ids.concat(inventoryIds);
          }, [])
          .map((id, index) => <Item inline key={index} item={items && items[id]} />)}
        </div>
      </Container>
    );
  }
}
