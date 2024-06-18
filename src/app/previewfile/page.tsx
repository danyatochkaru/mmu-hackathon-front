'use client'

import "@cyntler/react-doc-viewer/dist/index.css";
import DocViewer, {DocViewerRenderers} from "@cyntler/react-doc-viewer";

function App() {
    const docs = [
        {uri: "http://danyatochka.ru:1337/uploads/MMU_lichnyj_kabinet_partnera_docx_16fcb44832.pdf"},
    ];

    return (
        <div className="container">
            <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}/>;
        </div>
    )
}

export default App;