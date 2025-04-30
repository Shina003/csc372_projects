// src/utils/cloudinary.js
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

// 1) Initialize with your cloud name from import.meta.env
export const cld = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
    url: {
        secure: true,
    },
});

/**
 * Build a transformed URL for a given publicId.
 * @param {string} publicId    e.g. "members client site/omotoye_kqldna"
 * @param {object} options     { width, height }
 * @returns {string}           fully-qualified image URL
 */
export function urlFor(publicId, { width = 200, height = 200 } = {}) {
    return cld.image(publicId).resize(fill().width(width).height(height)).toURL();
}
