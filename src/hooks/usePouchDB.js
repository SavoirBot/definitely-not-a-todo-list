import { useEffect, useMemo, useState } from 'react';
import PouchDB from 'pouchdb-browser';

const remoteUrl = import.meta.env.COUCHDB_URL;

export const usePouchDB = () => {
    const [error, setError] = useState(false);
    const [ready, setReady] = useState(false);
    const [alive, setAlive] = useState(false);

    // Create the local and remote databases for syncing
    const [localDb, remoteDb] = useMemo(
        () => [new PouchDB('reading_lists'), new PouchDB(remoteUrl)],
        []
    );

    // Start the sync in a separate effect, track any critical errors.
    useEffect(() => {
        const canceller = localDb
            .sync(remoteDb, {
                live: true,
                heartbeat: false,
                timeout: false,
                retry: true,
            })
            .on('error', () => {
                setAlive(false);
                setError(true);
            });

        return () => {
            canceller.cancel();
        };
    }, [localDb, remoteDb]);

    // Create an interval after checking the status of the database for the
    // first time
    useEffect(() => {
        let cancelInterval;

        remoteDb
            .info()
            .then(() => {
                setReady(true);

                cancelInterval = setInterval(() => {
                    remoteDb
                        .info()
                        .then(() => {
                            setAlive(true);
                        })
                        .catch(() => {
                            setAlive(false);
                        });
                }, 1000)
            })
            .catch(() => {
                setError(true);
            });

        return () => {
            clearTimeout(cancelInterval);
        };
    }, [remoteDb]);

    return {
        db: localDb,
        ready,
        alive,
        error,
    };
};
