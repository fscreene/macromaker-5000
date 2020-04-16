import React from "react";
import { Modifiers } from "./modifiers";
import { Pre, EditableText, Switch } from "@blueprintjs/core";
import dark from "./MacroMaker.module.css";

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
            ? "bp3-dark " + dark.dark + " " + dark.full
            : "bp3-body";
        return (
            <div className={className}>
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
                <Pre>{this.getFormatted()}</Pre>

                <Switch
                    checked={this.state.darkMode}
                    label="Dark Mode"
                    onChange={this.toggleDarkMode}
                />
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
