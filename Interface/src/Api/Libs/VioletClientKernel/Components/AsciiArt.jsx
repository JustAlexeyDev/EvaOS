

const AsciiArt = () => {
    const asciiArt = `
    _______           _______  _______  _______ 
    (  ____ \\\\     /|(  ___  )(  ___  )(  ____ \\  
    | (    \\/| )   ( || (   ) || (   ) || (    \\/
    | (__    | |   | || (___) || |   | || (_____ 
    |  __)   ( (   ) )|  ___  || |   | |(_____  )
    | (       \\ \\_/ / | (   ) || |   | |      ) |
    | (____/\\  \\   /  | )   ( || (___) |/\\____) |
    (_______/   \\_/   |/     \\|(_______)\\_______)
    `;

    return (
        <div style={{ whiteSpace: 'pre', fontFamily: 'monospace', fontSize: '6px'}}>
            {asciiArt}
        </div>
    );
};

export default AsciiArt;