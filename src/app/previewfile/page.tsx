'use client'

import "@cyntler/react-doc-viewer/dist/index.css";
import DocViewer, {DocViewerRenderers} from "@cyntler/react-doc-viewer";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {ROUTES} from "@/constants/routes";

export default function PreviewPage({searchParams}: { searchParams: { uri: string } }) {
    const router = useRouter()

    useEffect(() => {
        if (!searchParams.uri) {
            router.replace(ROUTES.home)
        }
    }, [searchParams.uri]);

    return (
        <div className="container">
            <DocViewer
                documents={[
                    {uri: searchParams.uri},
                ]}
                pluginRenderers={DocViewerRenderers}
            />
        </div>
    )
}