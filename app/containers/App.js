import React, { Component, PropTypes } from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import spacing from 'material-ui/styles/spacing';
import { darkWhite, lightWhite } from 'material-ui/styles/colors';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  getStyles() {
    const styles = {
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400
      },
      content: {
        margin: spacing.desktopGutter
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`
      },
      a: {
        color: darkWhite
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: lightWhite,
        maxWidth: 356,
      }
    };

    return styles;
  }

  render() {
    const {
      children
    } = this.props;

    const styles = this.getStyles();

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div style={styles.root}>
          <div style={styles.content}>
            {children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
