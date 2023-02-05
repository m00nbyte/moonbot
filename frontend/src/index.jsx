// modules
import ReactDOM from 'react-dom/client';

// components
import App from 'src/App';

// styles
import 'src/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/styles.css';
import 'src/styles/custom.css';

const element = document.getElementById('root');
const root = ReactDOM.createRoot(element);
root.render(<App />);
