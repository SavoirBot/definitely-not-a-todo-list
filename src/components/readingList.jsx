import React from 'react';

import { useReadingList } from '../hooks/useReadingList';
import { AddReadingElement } from './addReadingElement';

export const ReadingList = ({ db, alive }) => {
    const [loading, documents] = useReadingList(db);

    const handleAddElement = name => {
        db.post({
            name,
            read: false,
        });
    };

    const handleRemoveElement = element => {
        db.remove(element);
    };

    const handleToggleRead = element => {
        db.put({
            ...element,
            read: !element.read,
        });
    };

    return (
        <div>
            <h1>Definitely not a todo list</h1>
            {!alive && (
                <div>
                    <h2>Warning</h2>
                    The connection with the database has been lost, you can
                    still work on your documents, we will sync everything once
                    the connection is re-established.
                </div>
            )}
            {loading && <div>loading...</div>}
            {documents.length ? (
                <ul>
                    {documents.map(doc => (
                        <li key={doc._id}>
                            <input
                                type="checkbox"
                                checked={doc.read}
                                onChange={() => handleToggleRead(doc)}
                                id={doc._id}
                            />
                            <label htmlFor={doc._id}>{doc.name}</label>
                            <button
                                onClick={() => handleRemoveElement(doc)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No books to read added, yet</div>
            )}
            <AddReadingElement handleAddElement={handleAddElement} />
        </div>
    );
};
