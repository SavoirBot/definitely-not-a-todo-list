import { useEffect, useState } from 'react';

export const useReadingList = (db, isReady) => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState([]);

    const fetchData = () => {
        setLoading(true);

        db.allDocs({
            include_docs: true,
        }).then(result => {
            setLoading(false);
            setDocuments(result.rows.map(row => row.doc));
        });
    };

    useEffect(() => {
        fetchData();

        const canceler = db
            .changes({
                since: 'now',
                live: true,
                include_docs: true,
            })
            .on('change', () => {
                fetchData();
            });

        return () => {
            canceler.cancel();
        };
    }, [db]);

    return [loading, documents];
};
