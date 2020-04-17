import React from "react";
import { Modifiers } from "./modifiers";
import {
    Pre,
    Switch,
    Label,
    H1,
    Navbar,
    Button,
    Alignment,
    H3,
    Callout,
    Intent,
    Toaster
} from "@blueprintjs/core";
import styles from "./MacroMaker.module.scss";
import classNames from "classnames";
import CopyToClipboard from "react-copy-to-clipboard";
import { chunk } from "lodash";

interface IState {
    modifiers: string[];
    skillName: string;
    darkMode: boolean;
    selected: string;
}

const classes = [
    "Warrior",
    "Paladin",
    "Hunter",
    "Rogue",
    "Priest",
    "Shaman",
    "Mage",
    "Warlock",
    "Monk",
    "Druid",
    "Demon Hunter",
    "Death Knight"
];

const spells: { [key: string]: string[] } = {
    paladin: [
        "Blessing of Freedom",
        "Bestow Faith",
        "Redemption",
        "Hand of Reckoning",
        "Lay on Hands",
        "Beacon of Faith",
        "Holy Light",
        "Holy Shock",
        "Flash of Light",
        "Beacon of Light",
        "Cleanse",
        "Blessing of Protection",
        "Blessing of Sacrifice",
        "Light of the Martyr"
    ],
    warrior: [],
    hunter: [],
    rogue: [],
    priest: [],
    shaman: [],
    mage: [],
    warlock: [],
    monk: [],
    druid: [],
    "demon hunter": [],
    "death knight": []
};

const toaster = Toaster.create();

export class MacroMaker extends React.Component<{}, IState> {
    public state = {
        modifiers: [],
        skillName: "",
        darkMode: false,
        selected: "death knight"
    };

    private setSelected(selected: string) {
        this.setState({ selected });
    }

    public render() {
        // document.body.className = this.state.darkMode ? "bp3-dark" : "bp3-body";
        const className = this.state.darkMode
            ? "bp3-dark " + styles.dark + " " + styles.full
            : "bp3-body";
        return (
            <div className={classNames(className, styles.container)}>
                <div className={styles.maker}>
                    <H1>MACROMAKER 5000</H1>
                    <Navbar>
                        <Navbar.Group align={Alignment.LEFT}>
                            <Navbar.Heading>Class</Navbar.Heading>
                            <Navbar.Divider />
                            {classes.sort().map(cl => (
                                <Button
                                    className="bp3-minimal"
                                    // icon="home"
                                    text={cl}
                                    onClick={() =>
                                        this.setSelected(cl.toLowerCase())
                                    }
                                />
                            ))}
                        </Navbar.Group>
                    </Navbar>
                    <div>
                        <H3>Spells</H3>
                        {spells[this.state.selected].length === 0 ? (
                            <Callout
                                intent={Intent.WARNING}
                                title={
                                    "No spells have been added for this class yet"
                                }
                            >
                                It's probably not worth playing
                            </Callout>
                        ) : null}
                        <div className={styles.spells}>
                            {chunk(
                                spells[this.state.selected].sort(),
                                Math.ceil(
                                    spells[this.state.selected].length / 4
                                )
                            ).map(spellChunk => (
                                <div className={styles.chunk}>
                                    {spellChunk.map(spell => (
                                        <Button
                                            className="bp3-minimal"
                                            // icon="home"
                                            outlined={true}
                                            text={spell}
                                            onClick={() =>
                                                this.editSpellName(spell)
                                            }
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <Modifiers
                        onChangeModifiers={modifiers => {
                            this.setState({ modifiers });
                        }}
                    />
                    <div>
                        <div className={styles.center}>
                            <div className={styles.output}>
                                <Label>Your Macro</Label>
                                <Pre>{this.getFormatted()}</Pre>
                            </div>
                        </div>
                        <CopyToClipboard
                            text={this.getFormatted()}
                            onCopy={() =>
                                toaster.show({
                                    message: "Macro copied to clipboard!",
                                    intent: Intent.SUCCESS
                                })
                            }
                        >
                            <Button
                                className={styles.copyButton}
                                large={true}
                                text={"Copy to clipboard"}
                                intent={Intent.PRIMARY}
                            />
                        </CopyToClipboard>
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
