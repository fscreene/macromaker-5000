import React from "react";
import { Modifiers } from "./modifiers";
import { Pre, EditableText } from "@blueprintjs/core";

interface IState {
    modifiers: string[];
    skillName: string;
}

export class MacroMaker extends React.Component<{}, IState> {
    public state = {
        modifiers: [],
        skillName: ""
    };

    public render() {
        return (
            <div>
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
            </div>
        );
    }

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
