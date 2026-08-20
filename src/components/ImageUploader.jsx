import React, { useRef, useState } from 'react';
import { FaCloudArrowUp, FaTrash, FaLink } from 'react-icons/fa6';
import { uploadImage, deleteImage } from '../api/products.api';
import { resolveImageUrl } from '../utils/imageUrl';
import { confirmAction } from '../utils/alerts';

/* ---------------------------------------------------------------------------
   Product photo picker.

   The shop owner picks a file from their phone or laptop; it uploads to the
   API, which stores the bytes in MongoDB and returns a path. The value handed
   back to the form is that path — never the file itself.

   Pasting a URL is kept as a second option, because some stock photography is
   already hosted elsewhere and re-uploading it would be pointless work.
--------------------------------------------------------------------------- */

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED = 'image/jpeg,image/png,image/webp,image/gif';

// Uploads we own look like /api/images/<24-hex-id>. Anything else — a pasted
// link, or one of the shop's own static photos — is not ours to delete.
const UPLOADED = /^\/api\/images\/([a-f0-9]{24})$/i;

const ImageUploader = ({ value, onChange, error }) => {
    const inputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [localError, setLocalError] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [mode, setMode] = useState('upload');

    const handleFile = async (file) => {
        if (!file) return;

        setLocalError('');

        // Checked here as well as on the server so the owner is told
        // immediately rather than after uploading several megabytes.
        if (!ACCEPTED.split(',').includes(file.type)) {
            setLocalError('Choose a JPG, PNG, WebP or GIF image.');
            return;
        }

        if (file.size > MAX_BYTES) {
            setLocalError(
                `That image is ${(file.size / 1024 / 1024).toFixed(1)}MB — the limit is 5MB.`,
            );
            return;
        }

        setUploading(true);
        setProgress(0);

        try {
            const result = await uploadImage(file, { onProgress: setProgress });
            onChange(result.url);
        } catch (uploadError) {
            setLocalError(uploadError.message);
        } finally {
            setUploading(false);
            setProgress(0);
            // Clearing the input means picking the same file again still fires
            // a change event, which it otherwise would not.
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    // Clearing the field and deleting the stored bytes are two different
    // actions, and the difference matters: one is free to undo, the other is
    // permanent. Which one happens depends on who owns the file.
    const handleRemove = async () => {
        const owned = UPLOADED.exec(value ?? '');

        if (!owned) {
            // A pasted URL points at someone else's server. Unlink only.
            onChange('');
            return;
        }

        const confirmed = await confirmAction({
            title: 'Delete this photo?',
            text: 'The image file will be permanently removed from storage.',
            confirmLabel: 'Delete',
            danger: true,
        });

        if (!confirmed) return;

        setDeleting(true);

        // Cleared first: if the request fails the form must not still be
        // pointing at a photo the owner has just been told is going away.
        onChange('');

        try {
            await deleteImage(owned[1]);
        } catch (deleteError) {
            // The field is already clear and the product will save correctly.
            // The only consequence is an orphaned file, so this is reported
            // rather than treated as a failure the owner must resolve.
            setLocalError(`Photo removed from the product, but the stored file could not be deleted: ${deleteError.message}`);
        } finally {
            setDeleting(false);
        }
    };

    const shownError = error ?? localError;

    return (
        <div>
            <div className="mb-3 flex gap-1">
                {[
                    { key: 'upload', label: 'Upload from device', icon: FaCloudArrowUp },
                    { key: 'url', label: 'Paste a link', icon: FaLink },
                ].map((tab) => {
                    const Icon = tab.icon;
                    const active = mode === tab.key;

                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setMode(tab.key)}
                            aria-pressed={active}
                            className={`flex items-center gap-2 border px-3 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors ${
                                active
                                    ? 'border-primary bg-primary text-primary-content'
                                    : 'border-base-300 text-base-content/55 hover:border-base-content/40'
                            }`}
                        >
                            <Icon className="text-[11px]" aria-hidden="true" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {mode === 'upload' ? (
                <div
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                        event.preventDefault();
                        handleFile(event.dataTransfer.files?.[0]);
                    }}
                    className={`border border-dashed p-6 text-center transition-colors ${
                        shownError ? 'border-error' : 'border-base-300 hover:border-primary'
                    }`}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept={ACCEPTED}
                        onChange={(event) => handleFile(event.target.files?.[0])}
                        className="sr-only"
                        id="product-image-file"
                    />

                    <FaCloudArrowUp
                        className="mx-auto text-2xl text-base-content/30"
                        aria-hidden="true"
                    />

                    <label
                        htmlFor="product-image-file"
                        className="mt-3 inline-block cursor-pointer border border-base-300 px-4 py-2 text-[12px] font-medium transition-colors hover:border-base-content/40"
                    >
                        {uploading ? 'Uploading…' : 'Choose a photo'}
                    </label>

                    <p className="mt-2 text-[11px] text-base-content/45">
                        or drag one here — JPG, PNG, WebP or GIF, up to 5MB
                    </p>

                    {uploading && (
                        <div
                            className="mt-4 h-1 w-full overflow-hidden bg-base-300"
                            role="progressbar"
                            aria-valuenow={progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        >
                            <div
                                className="h-full bg-primary transition-[width] duration-200"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <input
                    type="url"
                    value={value?.startsWith('http') ? value : ''}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder="https://…"
                    className={`w-full border bg-base-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-base-content/30 focus:border-primary ${
                        shownError ? 'border-error' : 'border-base-300'
                    }`}
                />
            )}

            {shownError && (
                <p role="alert" className="mt-2 text-[12px] text-error">
                    {shownError}
                </p>
            )}

            {value && (
                <div className="mt-4 flex items-start gap-3">
                    <img
                        src={resolveImageUrl(value)}
                        alt="Product preview"
                        className="size-24 border border-base-300 bg-white object-contain"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        disabled={deleting}
                        className="flex items-center gap-1.5 text-[11px] tracking-wide text-base-content/50 uppercase transition-colors hover:text-error disabled:opacity-40"
                    >
                        {deleting ? (
                            'Deleting…'
                        ) : (
                            <>
                                <FaTrash className="text-[10px]" aria-hidden="true" />
                                {UPLOADED.test(value ?? '') ? 'Delete photo' : 'Remove'}
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
