import React, { PureComponent } from 'react';
import withAppContext from 'components/hocs/withAppContext';
import { getControlComponent } from 'utils/controls';
import styles from './ControlsPanel.less';

class ControlsPanel extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            displays: [],
            activeIndex: 0,
        };

        this.nodes = {};
        this.controls = {};
    }

    componentDidUpdate() {
        this.focusControl(this.state.activeIndex);
    }

    getControls() {
        const { app: { stage } } = this.props;
        const { displays, activeIndex } = this.state;
        const { width, height } = stage.getSize();

        return displays.map((display, index) => {
            const { id } = display;
            const Component = getControlComponent(display);

            return (
                <div
                    key={id}
                    ref={e => (this.nodes[id] = e)}
                    className={styles.wrapper}
                >
                    <Component
                        ref={e => (this.controls[id] = e)}
                        display={display}
                        active={index === activeIndex}
                        stageWidth={width}
                        stageHeight={height}
                    />
                </div>
            );
        });
    }

    updateControl(display) {
        const control = this.controls[display.id];

        if (control) {
            control.setState(display.options);
        }
    }

    focusControl(index) {
        const { displays } = this.state;
        const display = displays[index];

        if (display) {
            const node = this.nodes[display.id];

            if (node) {
                this.nodes.panel.scrollTop = node.offsetTop;

                this.setState({ activeIndex: index });
            }
        }
    }

    updateState(state) {
        this.setState(state);
    }

    render() {
        const controls = this.getControls();

        return (
            <div className={styles.panel} ref={e => (this.nodes.panel = e)}>
                <div>
                    {controls}
                </div>
            </div>
        );
    }
}

export default withAppContext(ControlsPanel);