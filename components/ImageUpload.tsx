import { useState } from 'react';

async function getPresignedUrl(file: { extension: string }) {
  const res = await fetch('/api/graphql', {
    method: 'post',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: `mutation createUploadUrl($extension: String!) { createUploadUrl(extension: $extension) { key uploadUrl } }`,
      variables: {
        extension: file.extension,
      },
    }),
  });

  const data = await res.json();

  return data.data.createUploadUrl.uploadUrl;
}

async function uploadFile(file: File, url: string): Promise<string> {
  const response = await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type!,
    },
  });

  return url.split('?')[0];
}

export function ImageUpload({
  onComplete,
  disabled,
}: {
  onComplete: (url: string) => void;
  disabled?: boolean;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [uploading, setUploading] = useState(false);

  function startUpload() {
    setUploading(true);
    getPresignedUrl({
      extension: selectedFile!.name.split('.').pop()!,
    })
      .then((url) => uploadFile(selectedFile!, url))
      .then((url) => onComplete(url))
      .catch((err) => {
        setUploading(false);
        setError(err);
      });
  }

  if (error) {
    return <pre className="text-red-600">{String(error)}</pre>;
  }

  return (
    <div>
      {selectedFile ? (
        <div>
          <div className="inline-block relative py-2">
            {!uploading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 absolute -top-2 -right-6 text-red-600 mx-2 mb-2 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => setSelectedFile(null)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="max-w-full max-h-[350px]"
              alt="upload-preview"
              src={URL.createObjectURL(selectedFile)}
            />
          </div>
        </div>
      ) : (
        <label
          className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white ${
            disabled ? 'bg-gray-300' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          Select or take a photo
          <input
            disabled={disabled}
            className="hidden"
            type="file"
            name="file"
            accept="image/*"
            onChange={(ev) => setSelectedFile(ev.target.files?.[0] ?? null)}
          />
        </label>
      )}

      {selectedFile && !uploading && (
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            startUpload();
          }}
        >
          Post!
        </button>
      )}
      {uploading && 'Uploading...'}
    </div>
  );
}
