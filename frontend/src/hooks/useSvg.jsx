import { useEffect, useState, useRef } from 'react';

function useDynamicSVGImport(name, options = {}) {
    const ImportedIconRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const { onCompleted, onError } = options;
    useEffect(() => {
        setLoading(true);
        const importIcon = async () => {
            try {
                ImportedIconRef.current = (await import(`./${name}.svg`)).ReactComponent;
                if (onCompleted) {
                    onCompleted(name, ImportedIconRef.current);
                }
            } catch (err) {
                if (onError) {
                    onError(err);
                }
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        importIcon();
    }, [name, onCompleted, onError]);

    return { error, loading, SvgIcon: ImportedIconRef.current };
}

export default useDynamicSVGImport;
