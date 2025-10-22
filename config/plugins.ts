export default ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloudName: env('CLOUDINARY_NAME'),
        apiKey: env('CLOUDINARY_API_KEY'),
        apiSecret: env('CLOUDINARY_API_SECRET'),
        defaultTransformations: env.json('CLOUDINARY_DEFAULT_TRANSFORMATIONS', []),
      },
    },
  },
});
