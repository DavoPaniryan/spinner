import styles from './Add.module.css';

interface IAddSectionOpntions {
    newSectionText: string;
    setNewSectionText: (text: string) => void;
    newSectionColor: string;
    setNewSectionColor: (text: string) => void;
    addSection: () => void;
}

export const AddSection = ({
    newSectionColor,
    setNewSectionText,
    newSectionText,
    setNewSectionColor,
    addSection,
}: IAddSectionOpntions) => {
    return (
        <div className={styles.addSectionForm}>
            <input
                type="text"
                placeholder="Enter section text"
                value={newSectionText}
                onChange={(e) => setNewSectionText(e.target.value)}
                className={styles.input}
            />
            <input
                type="color"
                value={newSectionColor}
                onChange={(e) => setNewSectionColor(e.target.value)}
                className={styles.colorPicker}
            />
            <button onClick={addSection} className={styles.addButton}>
                Add Section
            </button>
        </div>
    );
};
