import { useState, useEffect, useRef } from "react";

const useHost = () => {

    const [host, setHost] = useState('');

    const handleHost = () => {
        const urlAddress = window.location.host;
        const domain = new URL(urlAddress);
        const host = domain.hostname;
        setHost(host);
    }

    useEffect(() => {
        handleHost();
    });

    return host;

}

export default useHost;