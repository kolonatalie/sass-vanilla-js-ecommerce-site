//For the GitHub Pages deploying 
export const getBasePath = () => {

    const path = window.location.pathname;
    const segments = path.split('/').filter(s => s.length > 0);
    
    if (segments.length > 0 && 
        segments[0] !== 'pages' && 
        segments[0].toLowerCase().endsWith('.html') === false) {
        
        return `/${segments[0]}`; 
    }
    return ''; 
};

export const getAssetUrl = (rootRelativePath) => {
    const BASE_PATH = getBasePath();

    return `${BASE_PATH}${rootRelativePath}`;
};