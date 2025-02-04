import { useState } from 'react';
import styles from './Spinner.module.css';
import { AddSection } from './Add/AddSection';
import { ISection } from '../../helpers/types';
import { EditSection } from './Edit/EditSection';

export const Spinner = () => {
    const [rotation, setRotation] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [sections, setSections] = useState<ISection[]>([]);
    const [newSectionText, setNewSectionText] = useState('');
    const [newSectionColor, setNewSectionColor] = useState('#ffffff');
    const [currentSection, setCurrentSection] = useState<ISection | null>(null);
    const [error, setError] = useState<string>('');
    const [winner, setWinner] = useState<ISection | null>(null);

    const handleSpin = () => {
        if (spinning || sections.length === 0) return;
        setSpinning(true);

        const spins = Math.floor(Math.random() * (120 - 80 + 1)) + 80;
        const additionalRotation = Math.random() * 360;
        const finalRotation = rotation + spins * 360 + additionalRotation;

        setRotation(finalRotation);

        setTimeout(() => {
            setSpinning(false);
            calculateLandedSection(finalRotation);
        }, 3000);
    };

    const calculateLandedSection = (newRotation: number) => {
        if (sections.length === 0) return;

        const anglePerSection = 360 / sections.length;
        const normalizedRotation = ((newRotation % 360) + 360) % 360;

        const pointerOffset = Math.round(anglePerSection / 2);

        const adjustedRotation =
            (pointerOffset - normalizedRotation + 360) % 360;

        const sectionIndex =
            Math.floor(adjustedRotation / anglePerSection) % sections.length;

        setWinner(sections[sectionIndex]);
    };

    const addSection = () => {
        if (!newSectionText.trim()) return;
        if (spinning) {
            return setError('You cant add section while wheel is spinning');
        }
        setSections([
            ...sections,
            { id: Date.now(), color: newSectionColor, text: newSectionText },
        ]);
        setNewSectionText('');
        setNewSectionColor('#ffffff');
        setError('');
    };

    return (
        <div className={styles.wrapper}>
            {winner && <h3>Winner: {winner.text}</h3>}
            <div className={styles.wheelContainer}>
                <div
                    className={styles.wheel}
                    style={{ transform: `rotate(${rotation}deg)` }}>
                    {sections.map((section, index) => {
                        const angle = (index * 360) / sections.length;
                        const anglePerSection = 360 / sections.length;
                        const rotationOffset = 90;

                        return (
                            <div
                                key={section.id}
                                className={styles.section}
                                onClick={() => setCurrentSection(section)}
                                style={{
                                    backgroundColor: section.color,
                                    transform: `rotate(${
                                        angle - rotationOffset
                                    }deg)`,
                                    clipPath:
                                        index !== 0
                                            ? `polygon(50% 50%, 100% ${
                                                  50 -
                                                  Math.tan(
                                                      (anglePerSection / 2) *
                                                          (Math.PI / 180),
                                                  ) *
                                                      50
                                              }%, 100% ${
                                                  50 +
                                                  Math.tan(
                                                      (anglePerSection / 2) *
                                                          (Math.PI / 180),
                                                  ) *
                                                      50
                                              }%)`
                                            : '',
                                }}>
                                <span
                                    className={styles.sectionText}
                                    style={{
                                        transform: `rotate(${
                                            anglePerSection / 2
                                        }deg) translate(120%, -50%) rotate(90deg)`,
                                    }}>
                                    {section.text}
                                </span>
                            </div>
                        );
                    })}

                    <button
                        onClick={handleSpin}
                        disabled={spinning}
                        className={styles.spinButton}>
                        SPIN
                    </button>
                </div>
                <div className={styles.arrow}>⬇</div>
            </div>

            <div className={styles.addSectionContainer}>
                {error && <p className={styles.error}>{error}</p>}
                <AddSection
                    addSection={addSection}
                    setNewSectionColor={setNewSectionColor}
                    setNewSectionText={setNewSectionText}
                    newSectionColor={newSectionColor}
                    newSectionText={newSectionText}
                />
            </div>

            {currentSection && (
                <div className={styles.editSectionContainer}>
                    <EditSection
                        spinning={spinning}
                        section={currentSection}
                        setSections={setSections}
                        sections={sections}
                        setCurrentSection={setCurrentSection}
                    />
                </div>
            )}
        </div>
    );
};
