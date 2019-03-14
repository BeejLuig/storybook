import React, { Component, Fragment } from 'react';

import { styled } from '@storybook/theming';
import { Icons } from '@storybook/components';

import { Result } from 'axe-core';
import { Info } from './Info';
import { Elements } from './Elements';
import { Tags } from './Tags';

const Wrapper = styled.div();

const Icon = styled<any, any>(Icons)(({ theme }) => ({
  height: 10,
  width: 10,
  minWidth: 10,
  color: theme.color.mediumdark,
  marginRight: '10px',
  transition: 'transform 0.1s ease-in-out',
  alignSelf: 'center',
  display: 'inline-flex',
}));

const HeaderBar = styled.button(({ theme }) => ({
  padding: theme.layoutMargin,
  paddingLeft: theme.layoutMargin - 3,
  display: 'flex',
  width: '100%',
  border: 0,
  background: 'none',
  color: 'inherit',
  textAlign: 'left',

  borderLeft: '3px solid transparent',

  '&:focus': {
    outline: '0 none',
    borderLeft: `3px solid ${theme.color.secondary}`,
  },
}));

interface ItemProps {
  item: Result;
  passes: boolean;
  type: string;
}

interface ItemState {
  open: boolean;
}

export class Item extends Component<ItemProps, ItemState> {
  state = {
    open: false,
  };

  onToggle = () =>
    this.setState(prevState => ({
      open: !prevState.open,
    }));

  render() {
    const { item, passes, type } = this.props;
    const { open } = this.state;

    return (
      <Wrapper>
        <HeaderBar onClick={this.onToggle}>
          <Icon
            icon="chevrondown"
            size={10}
            color="#9DA5AB"
            style={{
              transform: `rotate(${open ? 0 : -90}deg)`,
            }}
          />
          {item.description}
        </HeaderBar>
        {open ? (
          <Fragment>
            <Info item={item} key="info" />
            <Elements elements={item.nodes} passes={passes} type={type} key="elements" />
            <Tags tags={item.tags} key="tags" />
          </Fragment>
        ) : null}
      </Wrapper>
    );
  }
}
