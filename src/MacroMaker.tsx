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
    warrior: [
        "Battle Shout",
        "Execute",
        "Berserker Rage",
        "Heroic Leap",
        "Bloodthirst",
        "Heroic Throw",
        "Charge",
        "Intimidating Shout",
        "Dragon Roar",
        "Piercing Howl",
        "Enraged Regeneration",
        "Pummel",
        "Raging Blow",
        "Rallying Cry",
        "Rampage",
        "Recklessness",
        "Taunt",
        "Victory Rush",
        "Whirlwind"
    ],
    hunter: [
        "Call Pet",
        "Flare",
        "Aspect of the Turtle",
        "Pet Utility",
        "A Murder of Crows",
        "Eagle Eye",
        "Feign Death",
        "Cimaera Shot",
        "Barrage",
        "Barbed Shot",
        "Dire Beast: Hawk",
        "Dire Beast: Basilisk",
        "Freezing Trap",
        "Aspect of the Wild",
        "Tar Trap",
        "Cobra Shot",
        "Primal Rage",
        "Kill Command",
        "Aspect of the Cheetah",
        "Misdirection",
        "Disengage",
        "Bestial Wrath",
        "Exhilaration",
        "Multi-Shot",
        "Counter Shot",
        "Concussive Shot",
        "Intimidation"
    ],
    rogue: [
        "Sprint",
        "Shroud of Concealment",
        "Cloak of Shadows",
        "Kick",
        "Pick Lock",
        "Blind",
        "Feint",
        "Detection",
        "Crimson Vial",
        "Envenom",
        "Tricks of the Trade",
        "Mutilate",
        "Kidney Shot",
        "Fan of Knives",
        "Evasion",
        "Garrote",
        "Vanish",
        "Sap",
        "Stealth",
        "Poisons",
        "Vendetta",
        "Pick Pocket",
        "Rupture",
        "Cheap Shot",
        "Distract",
        "Shadowstep",
        "Poisoned Knife"
    ],
    priest: [
        "Fade",
        "Dispel Magic",
        "Circle of Healing",
        "Mass Dispel",
        "Power Word: Fortitude",
        "Halo",
        "Resurrection",
        "Angelic Feather",
        "Mind Control",
        "Smite",
        "Shackle Undead",
        "Mind Vision",
        "Symbol of Hope",
        "Holy Nova",
        "Psychic Stream",
        "Holy Word: Serenity",
        "Desperate Prayer",
        "Holy Word: Chastise",
        "Mass Resurrection",
        "Levitate",
        "Apotheosis",
        "Heal",
        "Flash Heal",
        "Prayer of Healing",
        "Holy Word: Sanctify",
        "Renew",
        "Guardian Spirit",
        "Leap of Faith",
        "Divine Hymn",
        "Purify",
        "Holy Fire",
        "Prayer of Mending"
    ],
    shaman: [
        "Tremor Totem",
        "Far Sight",
        "Water Walking",
        "Capacitor Totem",
        "Earthbind Totem",
        "Astral Shift",
        "Hex",
        "Ancestral Spirit",
        "Heroism",
        "Earthen Wall Totem",
        "Ghost Wolf",
        "Riptide",
        "Purify Spirit",
        "Astral Recall",
        "Purge",
        "Chain Heal",
        "Earth Elemental",
        "Healing Rain",
        "Healing Wave",
        "Flame Shock",
        "Spirit Link",
        "Cloudburst Totem",
        "Spiritwalker's Grace",
        "Chain Lightning",
        "Healing Surge",
        "Wind Shear",
        "Lightning Bolt",
        "Lava Burst",
        "Ancestral Vision",
        "Healing Tide Totem"
    ],
    mage: [
        "Slow Fall",
        "Teleport",
        "Ice Block",
        "Time Warp",
        "Arcane Intellect",
        "Shimmer",
        "Remove Curse",
        "Polymorph",
        "Conjure Refreshment",
        "Counterspell",
        "Portal",
        "Polymorph Variants",
        "Meteor",
        "Dragon's Breath",
        "Living Bomb",
        "Combustion",
        "Spellsteal",
        "Flamestrike",
        "Frost Nova",
        "Scorch",
        "Blazing Barrier",
        "Temporal Shield",
        "Invisibility",
        "Fire Blast",
        "Fireball",
        "Pyroblast"
    ],
    warlock: [
        "Agony",
        "Create Soulwell",
        "Banish",
        "Dark Soul: Misery",
        "Burning Rush",
        "Deathbolt",
        "Command Demon",
        "Demonic Circle",
        "Corruption",
        "Demonic Circle: Teleport",
        "Create Healthstone",
        "Demonic Gateway",
        "Drain Life",
        "Phantom Singularity",
        "Enslave Demon",
        "Ritual of Summoning",
        "Eye of Kilrogg",
        "Seed of Corruption",
        "Fear",
        "Shadow Bolt",
        "Haunt",
        "Shadowfury",
        "Health Funnel",
        "Siphon Life",
        "Soulstone",
        "Summon Darkglare",
        "Summon Demon",
        "Unending Breath",
        "Unending Resolve",
        "Unstable Affliction"
    ],
    monk: [
        "Summon Jade Serpent Statue",
        "Mana Tea",
        "Provoke",
        "Paralysis",
        "Ring of Peace",
        "Transcendence: Transfer",
        "Resuscitate",
        "Transcendence",
        "Tiger Palm",
        "Zen Pilgrimage",
        "Dampen Harm",
        "Crackling Jade Lightning",
        "Renewing Mist",
        "Essence Font",
        "Revival",
        "Detox",
        "Blackout Kick",
        "Rising Sun Kick",
        "Thunder Focus Tea",
        "Spinning Crane Kick",
        "Life Cocoon",
        "Vivify",
        "Enveloping Mist",
        "Reawaken",
        "Leg Sweep",
        "Fortifying Brew",
        "Soothing Mist",
        "Chi Torpedo"
    ],
    druid: [
        "Barkskin",
        "Entangling Roots",
        "Bear Form",
        "Growl",
        "Cat Form",
        "Hibernate",
        "Dash",
        "Innervate",
        "Dreamwalk",
        "Ironbark",
        "Efflorescence",
        "Lifebloom",
        "Mangle",
        "Rejuvenation",
        "Moonfire",
        "Revitalize",
        "Nature's Cure",
        "Revive",
        "Prowl",
        "Shred",
        "Rebirth",
        "Solar Wrath",
        "Regrowth",
        "Soothe",
        "Sunfire",
        "Swiftmend",
        "Tranquility"
    ],
    "demon hunter": [
        "Soul Cleave",
        "Infernal Strike",
        "Spectral Sight",
        "Shear",
        "Sigil of Flame",
        "Demon Spikes",
        "Imprison",
        "Immolation Aura",
        "Torment",
        "Disrupt",
        "Fiery Brand",
        "Throw Glaive",
        "Metamorphosis",
        "Glide"
    ],
    "death knight": [
        "Anti-Magic Shell",
        "Dancing Rune Weapon",
        "Death Grip",
        "Death Strike",
        "Mind Freeze",
        "Death Gate",
        "Path of Frost",
        "Dark Command",
        "Asphyxiate",
        "Death's Advance",
        "Control Undead",
        "Vampiric Blood",
        "Icebound Fortitude",
        "Marrowrend",
        "Runeforging",
        "Blood Boil",
        "Raise Ally",
        "Death and Decay",
        "Heart Strike",
        "Gorefiend's Grasp",
        "Death's Caress"
    ]
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
