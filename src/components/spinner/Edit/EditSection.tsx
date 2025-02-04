import { useState, useEffect } from 'react';
import { ISection } from '../../../helpers/types';
import styles from './EditSection.module.css';

interface EditSectionProps {
    section: ISection;
    setSections: React.Dispatch<React.SetStateAction<ISection[]>>;
    sections: ISection[];
    setCurrentSection: React.Dispatch<React.SetStateAction<ISection | null>>;
}

export const EditSection = ({
    section,
    setSections,
    sections,
    setCurrentSection,
}: EditSectionProps) => {
    const [newText, setNewText] = useState(section.text);
    const [newColor, setNewColor] = useState(section.color);

    useEffect(() => {
        setNewText(section.text);
        setNewColor(section.color);
    }, [section]);

    const handleSave = () => {
        const updatedSections = sections.map((sec) => {
            if (section.id !== sec.id) return sec;
            return { ...section, text: newText, color: newColor };
        });

        setSections(updatedSections);
        setCurrentSection(null);
    };

    const handleDelete = () => {
        const updatedSections = sections.filter((sec) => sec.id !== section.id);
        setSections(updatedSections);
        setCurrentSection(null);
    };

    return (
        <div className={styles.container}>
            <h3>Edit Section</h3>
            <div>
                <label>Text</label>
                <input
                    className={styles.input}
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                />
            </div>
            <div>
                <label>Color</label>
                <input
                    className={styles.colorInput}
                    type="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                />
            </div>
            <div className={styles.buttonContainer}>
                <button
                    className={`${styles.button} ${styles.saveButton}`}
                    onClick={handleSave}>
                    Save
                </button>
                <button
                    className={`${styles.button} ${styles.deleteButton}`}
                    onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};
