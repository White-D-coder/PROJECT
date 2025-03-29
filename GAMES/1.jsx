import React from "react";

const notes = [
    { note: "C", key: "A", sound: "path/to/C.mp3" },
    { note: "D", key: "S", sound: "path/to/D.mp3" },
    { note: "E", key: "D", sound: "path/to/E.mp3" },
    { note: "F", key: "F", sound: "path/to/F.mp3" },
    { note: "G", key: "G", sound: "path/to/G.mp3" },
    { note: "A", key: "H", sound: "path/to/A.mp3" },
    { note: "B", key: "J", sound: "path/to/B.mp3" },
];

const PianoKey = ({ note, keyLabel, sound }) => {
    const playSound = () => {
        const audio = new Audio(sound);
        audio.play();
    };

    return (
        <button onClick={playSound} className="piano-key">
            {note} ({keyLabel})
        </button>
    );
};

const PianoApp = () => {
    return (
        <div className="piano">
            <h1>Piano App</h1>
            <div className="piano-keys">
                {notes.map((n) => (
                    <PianoKey key={n.note} note={n.note} keyLabel={n.key} sound={n.sound} />
                ))}
            </div>
        </div>
    );
};

export default PianoApp;