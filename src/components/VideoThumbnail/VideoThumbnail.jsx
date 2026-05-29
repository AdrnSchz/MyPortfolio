import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./VideoThumbnail.css";

/**
 * Captures the first frame of a video via hidden <video> + <canvas>
 * and renders it as a static image with a play-button overlay.
 */
export function VideoThumbnail({ src, alt }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [thumbUrl, setThumbUrl] = useState(null);
    const [state, setState] = useState("loading"); // "loading" | "ready" | "failed"

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const capture = () => {
            try {
                canvas.width = video.videoWidth || 640;
                canvas.height = video.videoHeight || 360;
                canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
                const url = canvas.toDataURL("image/jpeg", 0.82);
                // A blank/black frame produces a near-uniform data URL — accept it anyway
                setThumbUrl(url);
                setState("ready");
            } catch {
                setState("failed");
            }
        };

        const onLoadedMetadata = () => {
            // Seek 1 s in so we get a real frame (not a possible black intro frame)
            video.currentTime = Math.min(1, video.duration || 1);
        };

        const onSeeked = () => capture();
        const onError = () => setState("failed");

        video.addEventListener("loadedmetadata", onLoadedMetadata);
        video.addEventListener("seeked", onSeeked);
        video.addEventListener("error", onError);

        return () => {
            video.removeEventListener("loadedmetadata", onLoadedMetadata);
            video.removeEventListener("seeked", onSeeked);
            video.removeEventListener("error", onError);
        };
    }, [src]);

    return (
        <div className="video-thumbnail">
            {/* Hidden elements for frame capture */}
            <video
                ref={videoRef}
                src={src}
                preload="metadata"
                muted
                playsInline
                aria-hidden="true"
            />
            <canvas ref={canvasRef} aria-hidden="true" />

            {/* Visible output */}
            {state === "loading" && <div className="video-thumbnail__skeleton" />}

            {state === "ready" && thumbUrl && (
                <div className="video-thumbnail__frame">
                    <img src={thumbUrl} alt={alt} className="video-thumbnail__img" />
                    <div className="video-thumbnail__overlay">
                        <div className="video-thumbnail__play">&#9654;</div>
                    </div>
                </div>
            )}

            {state === "failed" && (
                <div className="video-thumbnail__fallback">
                    <div className="video-thumbnail__play video-thumbnail__play--static">&#9654;</div>
                    <span>Video Demo</span>
                </div>
            )}
        </div>
    );
}

VideoThumbnail.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
};
