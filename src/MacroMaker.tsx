import React from "react";
import { Modifiers } from "./modifiers";
import { Pre, EditableText, Switch, Label } from "@blueprintjs/core";
import styles from "./MacroMaker.module.scss";
import classNames from "classnames";

interface IState {
    modifiers: string[];
    skillName: string;
    darkMode: boolean;
}

export class MacroMaker extends React.Component<{}, IState> {
    public state = {
        modifiers: [],
        skillName: "",
        darkMode: false
    };

    public render() {
        // document.body.className = this.state.darkMode ? "bp3-dark" : "bp3-body";
        const className = this.state.darkMode
            ? "bp3-dark " + styles.dark + " " + styles.full
            : "bp3-body";
        return (
            <div className={classNames(className, styles.container)}>
                <div className={styles.maker}>
                    <EditableText
                        placeholder="Enter spell name"
                        value={this.state.skillName}
                        onChange={this.editSpellName}
                    />
                    <Modifiers
                        onChangeModifiers={modifiers => {
                            this.setState({ modifiers });
                        }}
                    />
                    <div>
                        <Label>Your Macro</Label>
                        <Pre>{this.getFormatted()}</Pre>
                    </div>

                    <Switch
                        checked={this.state.darkMode}
                        label="Dark Mode"
                        onChange={this.toggleDarkMode}
                    />
                </div>
            </div>
        );
    }

    private toggleDarkMode = () => {
        this.setState({ darkMode: !this.state.darkMode });
    };

    private getFormatted = () => {
        let value = "#showtooltip " + this.state.skillName + "\n/cast";
        value += " " + this.getModifiers() + this.state.skillName;
        return value;
    };

    private getModifiers = () => {
        if (this.state.modifiers.length > 0) {
            return "[" + this.state.modifiers.join(", ") + "] ";
        }
        return "";
    };

    private editSpellName = (newValue: string) => {
        this.setState({ skillName: newValue });
    };
}
