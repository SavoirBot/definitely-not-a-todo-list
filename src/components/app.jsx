import React from 'react';

import { ReadingList } from './readingList';
import { usePouchDB } from '../hooks/usePouchDB';

export const App = () => {
    const { db, ready, alive, error } = usePouchDB();

    if (!ready) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
            <ReadingList db={db} alive={alive} error={error} />
        </div>
    );
};
