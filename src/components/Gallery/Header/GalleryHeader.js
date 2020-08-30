import React from "react";
import "./GalleryHeader.scss"

class GalleryHeader extends React.Component {
    render() {
        return (
            <div className="gallery-header">
                <h1 className="header-text">
                    Pokemon Gallery
                </h1>
            </div>
        );
    }
}

export default GalleryHeader;