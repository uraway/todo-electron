import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Settings from 'material-ui/svg-icons/action/settings';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import spacing from 'material-ui/styles/spacing';
import { darkWhite, lightWhite } from 'material-ui/styles/colors';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  state = {
    muiTheme: getMuiTheme(lightBaseTheme)
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  }

  componentWillMount() {
    this.setState({
      muiTheme: getMuiTheme(),
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme
    });
  }

  getStyles() {
    const styles = {
      appBar: {
        position: 'fixed',
        top: 0
      },
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

  handleChangeMuiTheme = (muiTheme) => {
    this.setState({
      muiTheme
    });
  }

  render() {
    const {
      children
    } = this.props;

    const styles = this.getStyles();

    return (
      <div>
        <AppBar
          style={styles.appBar}
          title="TodoElectron"
          iconElementRight={<IconButton><Settings /></IconButton>}
        />
        <div style={styles.root}>
          <div style={styles.content}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
