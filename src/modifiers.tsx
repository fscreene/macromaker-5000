import React from "react";
import { Checkbox, Label } from "@blueprintjs/core";

// Some dynamic bind for these
interface IState {
    mods: { [key: string]: boolean };
}

const mods: { [key: string]: string } = {
    mouseover: "@mouseover",
    help: "help",
    nodead: "nodead"
};

export class Modifiers extends React.Component<
    { onChangeModifiers: (modifiers: string[]) => void },
    IState
> {
    public state = {
        mods: {}
    };

    constructor(props: { onChangeModifiers: (modifiers: string[]) => void }) {
        super(props);
        const parsedMods: { [key: string]: boolean } = {};
        Object.keys(mods).map(key => {
            parsedMods[key] = false;
        });
        this.state = { mods: parsedMods };
    }

    public render() {
        return (
            <div>
                <Label>Cast modifiers</Label>
                {Object.keys(this.state.mods).map(key => {
                    const checked = (this.state.mods as {
                        [key: string]: boolean;
                    })[key];
                    return (
                        <Checkbox
                            key={key}
                            checked={checked}
                            label={mods[key]}
                            onChange={this.handleFlip(key)}
                        />
                    );
                })}
            </div>
        );
    }

    private handleFlip = (key: string) => {
        return () => {
            const currentValue = (this.state.mods as {
                [key: string]: boolean;
            })[key];
            const changed = Object.keys(this.state.mods)
                .map(k => {
                    if (k === key) {
                        if (!currentValue) {
                            return mods[key];
                        }
                        return;
                    }
                    if (
                        (this.state.mods as {
                            [key: string]: boolean;
                        })[k]
                    ) {
                        return mods[k];
                    }
                    return;
                })
                .filter(v => v !== undefined) as string[];
            this.props.onChangeModifiers(changed);
            this.setState({
                mods: { ...this.state.mods, [key]: !currentValue }
            });
        };
    };
}
